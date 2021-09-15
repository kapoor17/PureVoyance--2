import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nsp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public avatar: File;
  public avatarUrl: string;

  public languages = [
    {
      title: this.translate.instant('psychicRegistration.profile.frenchLanguageLabel'),
      value: 'french'
    },
    {
      title: this.translate.instant('psychicRegistration.profile.englishLanguageLabel'),
      value: 'english'
    },
    {
      title: this.translate.instant('psychicRegistration.profile.spanishLanguageLabel'),
      value: 'spain'
    },
    {
      title: this.translate.instant('psychicRegistration.profile.italianLanguageLabel'),
      value: 'italian'
    },
    {
      title: this.translate.instant('psychicRegistration.profile.otherLanguagesLabel'),
      value: 'others'
    }
  ];
  public week = [
    {
      title: this.translate.instant('week.mondayLabel'),
      value: 'monday'
    },
    {
      title: this.translate.instant('week.tuesdayLabel'),
      value: 'tuesday'
    },
    {
      title: this.translate.instant('week.wednesdayLabel'),
      value: 'wednesday'
    },
    {
      title: this.translate.instant('week.thursdayLabel'),
      value: 'thursday'
    },
    {
      title: this.translate.instant('week.fridayLabel'),
      value: 'friday'
    },
    {
      title: this.translate.instant('week.saturdayLabel'),
      value: 'saturday'
    },
    {
      title: this.translate.instant('week.sundayLabel'),
      value: 'sunday'
    }
  ];
  public workTime: Array<number>;
  public mediaContacts = [
    {
      title: this.translate.instant('psychicRegistration.profile.byTelephoneLabel'),
      value: 'telephone'
    },
    {
      title: this.translate.instant('psychicRegistration.profile.byEmailLabel'),
      value: 'mail'
    },
    {
      title: this.translate.instant('psychicRegistration.profile.bySMSLabel'),
      value: 'sms'
    },
    {
      title: this.translate.instant('psychicRegistration.profile.byChatLabel'),
      value: 'chat'
    }
  ];

  public psychicProfileForm: FormGroup;
  public languageForm: FormGroup;
  public daysOfWeek: FormGroup;
  public contactVariant: FormGroup;
  public agreeControl: FormControl;

  constructor(private readonly formBuilder: FormBuilder,
              public translate: TranslateService) {
  }

  public ngOnInit(): void {
    this.workTime = '_'.repeat(25).split('').map((_, i) => +i);
    this.setForm();
  }

  public setForm(): void {
    this.psychicProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      textAbout: ['', Validators.required]
    });
    this.languageForm = this.formBuilder.group({
      french: false,
      english: false,
      spain: false,
      italian: false,
      others: false,
      anotherLanguage: ['', Validators.required]
    });
    this.daysOfWeek = this.formBuilder.group({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    });
    this.contactVariant = this.formBuilder.group({
      telephone: false,
      mail: false,
      sms: false,
      chat: false,
      workTime: ['', Validators.required]
    });
    this.agreeControl = this.formBuilder.control(false);
  }

  public uploadAvatar(event): void {
    this.avatar = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.avatar);
    fileReader.onload = (event) => this.avatarUrl = (event.target.result as string);

    // const formData = new FormData();
    // formData.append('file', this.avatar, this.avatar.name);
    // this.service.saveAvatar(formData).pipe(UntilDestroy(this)).subscribe();
  }
}
