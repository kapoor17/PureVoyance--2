import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter, switchMap} from 'rxjs/operators';

import {ValidationService} from '../../../core/services/validation.service';
import {AuthService} from '../../../core/services/api/auth.service';
import {UserService} from '../../../core/services/user.service';
import {CountryOption} from 'src/app/+auth/interfaces/country-option.interface';
import {countryOptions} from 'src/app/core/constants/country-options.constant';
import {User} from 'src/app/core/interfaces/user/user';
import {NotificationService} from 'src/app/core/services/notification.service';
import {DatePipe} from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'nsp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DatePipe]
})
export class UserProfileComponent implements OnInit {
  public countryOptions: Array<CountryOption> = countryOptions;
  public countryOptionsArray: Record<string, CountryOption> = {};
  public form: FormGroup;
  public startDate: Date = new Date();
  public currentUser: User;
  public selectedCountriesArray: Array<any>;
  public phoneId: number = 0;

  public get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }


  private userId: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly datePipe: DatePipe) {
  }

  public ngOnInit(): void {
    this.startDate.setFullYear(this.startDate.getFullYear() - 18);

    this.userService.user$
      .pipe(
        filter(value => !!value),
        untilDestroyed(this))
      .subscribe(user => {
        this.userId = user.id;
        this.setupForm(user);
      });

    for (const option of countryOptions) {
      this.countryOptionsArray[option.phoneCode] = option;
    }
  }

  private setupForm(user: User): void {
    this.currentUser = user;
    this.form = this.formBuilder.group({
      name: [user.name, Validators.required],
      lastname: [user.lastname, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      birthday: [new Date(user.birthday), [Validators.required, this.validationService.olderThanValidator(72), this.validationService.youngerThanValidator(18)]],
      newsletter: [user.newsletter, Validators.required],
      country_id: [user.country?.id, Validators.required],
      zipcode: [user.zipcode, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      city: [user.city, Validators.required],
      number: [user.number, Validators.required],
      birth_place: [user.birth_place || '', Validators.required],
      phones: this.formBuilder.array(
        this.patchValues(user.phones.map(patchedPhones => ({
          ...patchedPhones,
          phone_code: `+${patchedPhones.phone_code}`
        }))),
        // this.validationService.multiplePhoneValidator.bind(this.validationService)
      ),
      street: [user.street, Validators.required]
    });

    this.form.controls.birthday.valueChanges.pipe(untilDestroyed(this))
      .subscribe(value => value.toString());
  }

  public patchValues(phones): AbstractControl[] {
    return phones.map(phone => {
      return this.formBuilder.group({
        phone: phone.phone,
        phone_code: phone.phone_code
      });
    });
  }

  public addPhone(): void {
    this.phones.push(this.createPhonesArray());
  }

  public removePhone(): void {
    if (this.phones?.length > 1) {
      this.phones.removeAt(this.phones.length - 1);
    }
  }

  public createPhonesArray(): FormGroup {
    return this.formBuilder.group({
      phone_code: '',
      phone: '',
      id: this.phoneId++,
      favorite: true
    });
  }

  public update(): void {
    const formData = this.form.value;
    formData.phones.forEach(el => {
      el.phone_code = el.phone_code.substring(1);
    });
    formData.birthday = this.datePipe.transform(formData.birthday, 'dd-MM-yyyy');
    if (this.form.valid) {
      this.authService.updateUser(this.form.value)
        .pipe(
          switchMap(() => this.authService.getUser()),
          untilDestroyed(this))
        .subscribe(user => {
            this.notificationService.success('success.commonSuccess');
            this.userService.onUserLoaded(user);
          },
          () => this.notificationService.error('error.commonError'));
    }
  }
}
