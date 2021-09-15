import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PhoneValidationApiService} from './api/phone-validation.api.service';
import {EmailValidationApiService} from './api/email-validation.api.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private readonly phoneValidationApiService: PhoneValidationApiService,
              private readonly emailValidationApiService: EmailValidationApiService) {
  }

  public passwordsAreEqualValidator(group: FormGroup): Record<string, boolean> {
    const groupControlNames = Object.keys(group.controls);

    if (groupControlNames.length !== 2) {
      return null;
    }

    if (!group.controls[groupControlNames[0]].value || !group.controls[groupControlNames[1]].value) {
      return null;
    }

    if (group.controls[groupControlNames[0]].value !== group.controls[groupControlNames[1]].value) {
      group.controls[groupControlNames[1]].setErrors({passwordsAreNotEqual: true});

      return {passwordsAreNotEqual: true};
    }

    return null;
  }

  public multiplePhoneValidator(control: AbstractControl): void {
    const groups = control['controls'];
    groups.forEach(el => {
      const phone = el['controls'].phone;
      const phoneCode = el['controls'].phone_code;
      let fullPhone;
      if (phoneCode?.value !== null && phone?.value !== null) {
        fullPhone = phoneCode?.value + phone?.value;
        if (fullPhone.length <= 11 || fullPhone.length > 13) {
          phone.setErrors({'error': 'Invalid Phone Length'});
        } else {
          this.phoneValidationApiService.validatePhone(fullPhone)
            .pipe(untilDestroyed(this))
            .subscribe(response => {
              if (!response.valid) {
                phone.setErrors({'error': 'Invalid Phone Number'});
              }
            });
        }
      }
    });
  }

  public emailValidator(email: AbstractControl): void {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regExp.test(email?.value)) {
      this.emailValidationApiService.validateEmail(email.value)
        .pipe(untilDestroyed(this)).subscribe(response => {
        if (!response.valid) {
          email.setErrors({'error': 'Invalid Email'});
        }
      });
    }
  }

  public olderThanValidator = (maxAge: number): ValidatorFn => control =>
    (new Date()).getFullYear() - (new Date(control.value)).getFullYear() > maxAge
      ? {younger: {maxAge}}
      : null;

  public youngerThanValidator = (minAge: number): ValidatorFn => control =>
    (new Date()).getFullYear() - (new Date(control.value)).getFullYear() <= minAge
      ? {older: {minAge}}
      : null;
}
