import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {filter} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {ValidationService} from 'src/app/core/services/validation.service';
import {UserService} from '../../../core/services/user.service';
import {HoroscopeService} from 'src/app/core/services/horoscope.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {AstrologyApiService} from 'src/app/core/services/api/astrology.api.service';
import {HoroscopeInterface} from 'src/app/shared/interfaces/horoscope.interface';

interface AstroCharacterFormInterface {
  birthDate: string;
  gender: string;
}

@UntilDestroy()
@Component({
  selector: 'nsp-astro-character',
  templateUrl: './astro-character.component.html',
  styleUrls: ['./astro-character.component.scss']
})
export class AstroCharacterComponent implements OnInit {
  public showResult: boolean = false;
  public result: string[] = [];
  public currentSign: HoroscopeInterface;

  public form: FormGroup<AstroCharacterFormInterface>;
  public startDate: Date = new Date();

  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly astrologyApiService: AstrologyApiService,
    private readonly horoscopeService: HoroscopeService,
    private readonly validationService: ValidationService,
    private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.startDate.setFullYear(this.startDate.getFullYear() - 18);

    this.form = this.formBuilder.group<AstroCharacterFormInterface>({
      birthDate: ['', [Validators.required, this.validationService.olderThanValidator(72), this.validationService.youngerThanValidator(18)]],
      gender: ['', Validators.required]
    });

    this.userService.user$
      .pipe(
        filter(value => !!value),
        untilDestroyed(this))
      .subscribe(user => {
        this.form.controls.birthDate.setValue(user.birthday);
      });
  }

  public submit(): void {
    if (!this.form.valid) {

      return;
    }

    this.currentSign = this.horoscopeService.getHoroscopeByDate(this.form.value.birthDate);
    if (!this.currentSign) {

      return;
    }

    this.astrologyApiService.getCharacter(this.currentSign.value, this.form.value.gender)
      .pipe(untilDestroyed(this))
      .subscribe(result => {
          this.result = result;
          this.showResult = true;
        },
        () => this.notificationService.error('error.commonError'));
  }

  public reset(): void {
    this.form.reset();
    this.showResult = false;
    this.result = [];
    this.currentSign = null;
  }
}
