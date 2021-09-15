import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {finalize} from 'rxjs/operators';

import {SpinnerService} from '../../../core/services/spinner.service';
import {AuthService} from '../../../core/services/api/auth.service';
import {ValidationService} from '../../../core/services/validation.service';
import {NotificationService} from '../../../core/services/notification.service';
import {SignInComponent} from '../sign-in/sign-in.component';
import {SignUp} from 'src/app/core/interfaces/auth/sign-up.interface';
import {CountryOption} from '../../interfaces/country-option.interface';
import {countryOptions} from 'src/app/core/constants/country-options.constant';
import {SettingsApiService} from 'src/app/core/services/api/settings.api.service';
import {TranslateService} from '@ngx-translate/core';
import {PhoneValidationApiService} from '../../../core/services/api/phone-validation.api.service';


@UntilDestroy()
@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  public title: string = this.translate.instant('signUp.freeRegistrationFirstPartLabel');
  public buttonClicked: boolean = false;
  public showPassword: boolean = false;
  public countryOptions: Array<CountryOption> = countryOptions;
  public countryOptionsArray: Record<string, CountryOption> = {};
  public selectedCountry: CountryOption;
  public phoneNumberId: number = 0;
  public startDate: Date = new Date();
  public isEnteringPassword: boolean = true;


  public get phonesArray(): FormArray {
    return this.mainInfo.get('phonesArray') as FormArray;
  }

  public mainInfo!: FormGroup;

  constructor(
    private readonly phoneValidationApiService: PhoneValidationApiService,
    private readonly settingsApiService: SettingsApiService,
    private readonly dialog: MatDialog,
    private readonly spinnerService: SpinnerService,
    private readonly authService: AuthService,
    private readonly validationService: ValidationService,
    private readonly notificationService: NotificationService,
    private readonly translate: TranslateService,
    private readonly formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.startDate.setFullYear(this.startDate.getFullYear() - 18);
    this.setForms();

    for (const option of countryOptions) {
      this.countryOptionsArray[option.phoneCode] = option;
    }
  }

  private setForms(): void {
    this.mainInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      birthDate: ['', [Validators.required, this.validationService.olderThanValidator(72), this.validationService.youngerThanValidator(18)]],
      email: ['', [Validators.required, Validators.email, this.validationService.emailValidator.bind(this.validationService)]],
      passwords: new FormGroup({
        password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')])),
        password_confirmation: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]))
      }, this.validationService.passwordsAreEqualValidator),
      phonesArray: this.formBuilder.array(
        [this.createPhonesArray()], [this.validationService.multiplePhoneValidator.bind(this.validationService)]
      ),
      newsletter: false
    });

    this.phonesArray.controls.forEach(el => {
      el['controls'].phone_code?.valueChanges.pipe(untilDestroyed(this))
        .subscribe(value => this.selectedCountry = this.countryOptions.find(item => item.phoneCode === value));
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public createPhonesArray(): FormGroup {
    return this.formBuilder.group({
      phone_code: '',
      phone: '',
      id: `${this.phoneNumberId++}`,
      favorite: ''
    });
  }

  // public addPhone(): void {
  //   this.phonesArray.push(this.createPhonesArray());
  // }

  // public removePhone(): void {
  //   if (this.phonesArray?.length > 1) {
  //     this.phonesArray.removeAt(this.phonesArray.length - 1);
  //   }
  // }

  public onCountryChange($event: MatSelectChange): void {
    this.mainInfo.patchValue({
      phoneCode: ($event.value as CountryOption)?.phoneCode
    }, {emitEvent: false});
  }

  public getCode(): void {
    this.buttonClicked = true;
    this.notificationService.success('success.commonSuccess');
  }

  public onClose(): void {
    this.dialog.closeAll();
  }

  public openSignIn(): void {
    this.dialog.closeAll();
    this.dialog.open(SignInComponent);
  }

  public onSignUp(): void {
    if (!this.mainInfo.valid) {
      return;
    }

    const request: SignUp = {
      email: this.mainInfo.value.email,
      password: this.mainInfo.value.passwords.password,
      password_confirmation: this.mainInfo.value.passwords.password_confirmation,
      name: this.mainInfo.value.firstName,
      birthday: this.mainInfo.value.birthDate,
      newsletter: this.mainInfo.value.newsletter,
      phones: this.mainInfo.value.phonesArray
    };

    this.spinnerService.showSpinner();
    this.authService
      .signUp(request)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this)
      )
      .subscribe(
        () => {
          this.notificationService.success('success.commonSuccess');
          this.dialog.closeAll();
        },
        () => {
          this.notificationService.error('error.commonError');
        });
  }
}
