import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';

import {filter, finalize, switchMap, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {countryOptions} from 'src/app/core/constants/country-options.constant';
import {CountryOption} from 'src/app/+auth/interfaces/country-option.interface';
import {ValidationService} from 'src/app/core/services/validation.service';
import {User} from 'src/app/core/interfaces/user/user';
import {ActivatedRoute} from '@angular/router';
import {UsersApiService} from '../../../../../core/services/api/users.api.service';
import {NotificationService} from '../../../../../core/services/notification.service';
import {ServerResponse} from '../../../../../core/interfaces/server-response';
import {SpinnerService} from '../../../../../core/services/spinner.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../../../../core/services/api/auth.service';
import {rolesList} from '../../../../../core/constants/roles-list';
import {Role} from '../../../../../core/interfaces/user/role';


@UntilDestroy()
@Component({
  templateUrl: './user-manipulation.component.html',
  styleUrls: ['./user-manipulation.component.scss'],
  providers: [DatePipe]
})
export class UserManipulationComponent implements OnInit {
  public countryOptions: Array<CountryOption> = countryOptions;
  public countryOptionsArray: Record<string, CountryOption> = {};
  public selectedCountry: CountryOption;
  public userForm: FormGroup;
  public id!: number;
  public user: User;
  public rolesList: Role[];
  public startDate: Date = new Date();

  public get phonesArray(): FormArray {
    return this.userForm.get('phonesArray') as FormArray;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersApiService: UsersApiService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly spinnerService: SpinnerService,
    private readonly datePipe: DatePipe) {
  }

  public ngOnInit(): void {
    this.startDate.setFullYear(this.startDate.getFullYear() - 18);
    location.pathname.includes('edit-user') ? this.getUser() : this.setForms();
    this.rolesList = rolesList;

    for (const option of countryOptions) {
      this.countryOptionsArray[option.phoneCode] = option;
    }
  }

  private setForms(user: ServerResponse<User> = null): void {
    this.userForm = this.formBuilder.group({
      roles: [user?.data?.roles],
      name: [user?.data?.name || '', [Validators.required, Validators.pattern(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm)]],
      email: [user?.data?.email || '', [Validators.required, this.validationService.emailValidator.bind(this.validationService)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
      password_confirmation: '',
      phone_code: ['+' + user?.data?.phone_code || '', Validators.required],
      number: [Number(user?.data?.number) || '', Validators.required],
      lastname: [user?.data?.lastname || '', [Validators.required, Validators.pattern(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm)]],
      birthday: [new Date(user?.data?.birthday) || '', [Validators.required, this.validationService.olderThanValidator(72), this.validationService.youngerThanValidator(18)]],
      birth_hour: [user?.data?.birth_hour || '', Validators.required],
      newsletter: user?.data?.newsletter || false,
      country_id: [user?.data?.country?.id || null, Validators.required],
      zipcode: user?.data?.zipcode || null,
      city: user?.data?.city || '',
      birth_place: user?.data?.birth_place || '',
      phone: [user?.data?.phone || '', Validators.required],
      street: [user?.data?.street || '', Validators.required],
      phonesArray: this.formBuilder.array(
        this.patchValues(this.user?.phones?.map(patchedPhones => ({
          ...patchedPhones,
          phone_code: `+${patchedPhones.phone_code}`
        }))),
        // this.validationService.multiplePhoneValidator.bind(this.validationService)
      ),
    });

    if (!!user?.data?.country?.id) {
      this.selectedCountry = this.countryOptions.find(item => item.id === user.data.country.id);
    }

    this.userForm.controls.phone_code.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => this.selectedCountry = this.countryOptions.find(item => item.phoneCode === value));

    this.userForm.controls.country_id.valueChanges
      .pipe(
        filter(() => !this.userForm.value.phone_code),
        untilDestroyed(this))
      .subscribe(value => {
        const targetCountry = this.countryOptions.find(item => item.id === value);
        this.userForm.patchValue({
          phone_code: targetCountry?.phoneCode
        }, {emitEvent: false});

        this.selectedCountry = targetCountry;
      });
  }

  public patchValues(phones): AbstractControl[] {
    if (phones?.length) {
      return phones?.map(phone => {
        return this.formBuilder.group({
          phone: phone.phone,
          phone_code: phone.phone_code
        });
      });
    }

    return [this.formBuilder.group({
      phone: '',
      phone_code: ''
    })];
  }

  private getUser(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => value.has('id')),
        tap(value => this.id = +value.get('id')),
        switchMap(() => this.usersApiService.getById(this.id)),
        untilDestroyed(this))
      .subscribe(
        user => {
          this.user = user.data;
          this.setForms(user);
        },
        () => this.notificationService.error('error.commonError'));
  }

  public onCountryChange($event: MatSelectChange): void {
    this.userForm.patchValue({
      phone_code: ($event.value as CountryOption)?.phoneCode
    }, {emitEvent: false});
  }

  public update(): void {
    const data = this.userForm.value;

    data.password_confirmation = data.password;
    data.roles = (data.roles as any[]).map(item => item.id);
    data.phone_code = data.phone_code.slice(1);
    data.birthday = this.datePipe.transform(data.birthday, 'dd-MM-yyyy');

    if (location.pathname.includes('edit-user')) {
      this.usersApiService.update(data, this.id)
        .pipe(
          finalize(() => this.spinnerService.hideSpinner()),
          untilDestroyed(this)
        ).subscribe(() => {
          this.notificationService.success('success.commonSuccess');
        },
        () => this.notificationService.error('error.commonError'));
    } else {
      this.usersApiService.create(data)
        .pipe(
          finalize(() => this.spinnerService.hideSpinner()),
          untilDestroyed(this))
        .subscribe(() => {
            this.notificationService.success('success.commonSuccess');
          },
          () => this.notificationService.error('error.commonError'));
    }
  }
}
