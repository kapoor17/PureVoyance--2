import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {GeneralPsychicInformationFormInterface} from '../../shared/interfaces/form-interfaces/general-psychic-information-form.interface';
import {Validators} from '@angular/forms';
import {ContactPsychicInformationFormInterface} from '../../shared/interfaces/form-interfaces/contact-psychic-information-form.interface';
import {ValidationService} from '../../core/services/validation.service';

@Component({
  selector: 'nsp-sign-up',
  templateUrl: './sign-up-psychic.component.html',
  styleUrls: ['./sign-up-psychic.component.scss']
})
export class SignUpPsychicComponent implements OnInit {
  public showPassword: boolean = false;
  public gender = [
    {
      image: '/assets/icons/psychic-registration/women-gender-icon.svg',
      gender: this.translate.instant('sexo.womanLabel')
    },
    {
      image: '/assets/icons/psychic-registration/man-gender-icon.svg',
      gender: this.translate.instant('sexo.manLabel')
    }
  ];
  public startDate: Date = new Date();

  public generalInformationForm: FormGroup<GeneralPsychicInformationFormInterface>;
  public contactInformationForm: FormGroup<ContactPsychicInformationFormInterface>;

  constructor(private readonly translate: TranslateService,
              private readonly formBuilder: FormBuilder,
              private readonly validationService: ValidationService) {
  }

  public ngOnInit(): void {
    this.startDate.setFullYear(this.startDate.getFullYear() - 18);

    this.generalInformationForm = this.formBuilder.group<GeneralPsychicInformationFormInterface>({
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      birthDate: ['', [Validators.required, this.validationService.olderThanValidator(72), this.validationService.youngerThanValidator(18)]],
      birthTime: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      mobile: ['', Validators.required],
      checkRadio: ['', Validators.required],
    });
    this.contactInformationForm = this.formBuilder.group<ContactPsychicInformationFormInterface>({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
      passwordConfirm: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
      newsletter: false
    });
  }


  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
