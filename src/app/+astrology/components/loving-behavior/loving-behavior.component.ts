import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {AstrologyApiService} from 'src/app/core/services/api/astrology.api.service';

import {HoroscopeService} from 'src/app/core/services/horoscope.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {HoroscopeInterface} from 'src/app/shared/interfaces/horoscope.interface';

interface LovingBehaviorFormInterface {
  sign: HoroscopeInterface;
  partnerSign: HoroscopeInterface;
}

@UntilDestroy()
@Component({
  selector: 'nsp-loving-behavior',
  templateUrl: './loving-behavior.component.html',
  styleUrls: ['./loving-behavior.component.scss']
})
export class LovingBehaviorComponent implements OnInit {
  public showResult: boolean = false;
  public result: string[] = [];
  public form: FormGroup<LovingBehaviorFormInterface>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly astrologyApiService: AstrologyApiService,
    private readonly notificationService: NotificationService,
    public readonly horoscopeService: HoroscopeService) {
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group<LovingBehaviorFormInterface>({
      sign: [null, Validators.required],
      partnerSign: [null, Validators.required]
    });
  }

  public submit(): void {
    if (!this.form.valid) {

      return;
    }

    this.astrologyApiService.getAffinities(this.form.value.sign.value, this.form.value.partnerSign.value)
      .pipe(untilDestroyed(this))
      .subscribe(response => {
          this.result = response;
          this.showResult = true;
        },
        () => this.notificationService.error('error.commonError'));
  }

  public reset(): void {
    this.form.reset();
    this.result = [];
    this.showResult = false;
  }
}
