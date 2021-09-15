import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {Observable} from 'rxjs';

import {DailyLoveHoroscope} from 'src/app/core/interfaces/horoscopes/daily-love-horoscope';
import {WeeklyLoveHoroscope} from 'src/app/core/interfaces/horoscopes/weekly-love-horoscope';
import {HoroscopeApiService} from 'src/app/core/services/api/horoscope.api.service';

import {HoroscopeService} from 'src/app/core/services/horoscope.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {SexoService} from 'src/app/core/services/sexo.service';
import {SexoTestFormInterface} from 'src/app/shared/interfaces/form-interfaces/sexo-test-form.interface';
import {HoroscopeInterface} from 'src/app/shared/interfaces/horoscope.interface';
import {SexoTestInterface} from 'src/app/shared/interfaces/sexo-test.interface';

@UntilDestroy()
@Component({
  selector: 'nsp-sexo-form',
  templateUrl: './sexo-form.component.html',
  styleUrls: ['./sexo-form.component.scss']
})
export class SexoFormComponent implements OnInit {
  public testType: 'daily' | 'weekly' | 'seventh-heaven';
  public showResults: boolean;
  public form: FormGroup<SexoTestFormInterface>;
  public currentSexoTest: SexoTestInterface;
  public result: DailyLoveHoroscope | WeeklyLoveHoroscope | string;
  public selectedSign: HoroscopeInterface;

  public get dailyLove(): DailyLoveHoroscope {
    return this.result as DailyLoveHoroscope;
  }

  public get weeklyLove(): WeeklyLoveHoroscope {
    return this.result as WeeklyLoveHoroscope;
  }

  public get seventhHeaven(): string {
    return this.result as string;
  }

  constructor(
    private readonly horoscopeApiService: HoroscopeApiService,
    private readonly notificationService: NotificationService,
    private readonly sexoService: SexoService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    public readonly horoscopeSigns: HoroscopeService) {
  }

  public ngOnInit(): void {
    const currentUrl = this.router.url.toString();
    if (currentUrl.endsWith('daily')) {
      this.currentSexoTest = this.sexoService.sexoTests.find(item => item.routePath === 'daily');
      this.testType = 'daily';
    } else if (currentUrl.endsWith('weekly')) {
      this.currentSexoTest = this.sexoService.sexoTests.find(item => item.routePath === 'weekly');
      this.testType = 'weekly';
    } else if (currentUrl.endsWith('seventh-heaven')) {
      this.currentSexoTest = this.sexoService.sexoTests.find(item => item.routePath === 'seventh-heaven');
      this.testType = 'seventh-heaven';
    } else {
      return;
    }

    this.form = this.formBuilder.group<SexoTestFormInterface>({
      sign: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.form.controls.sign.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(sign => this.selectedSign = this.horoscopeSigns.horoscopes.find(item => item.value === sign));
  }

  public getResult(): void {
    let endpointCall: Observable<DailyLoveHoroscope | WeeklyLoveHoroscope | string>;
    switch (this.testType) {
      case 'daily': {
        endpointCall = this.horoscopeApiService.getDailyLove(this.form.value.sign, this.form.value.gender);
        break;
      }
      case 'weekly': {
        endpointCall = this.horoscopeApiService.getWeeklyLove(this.form.value.sign, this.form.value.gender);
        break;
      }
      case 'seventh-heaven': {
        endpointCall = this.horoscopeApiService.getSeventhHeaven(this.form.value.sign, this.form.value.gender);
        break;
      }
      default: {
        return;
      }
    }

    endpointCall
      .pipe(untilDestroyed(this))
      .subscribe(value => {
          this.result = value;
          this.showResults = true;
        },
        () => this.notificationService.error('error.commonError'));
  }

  public discoverAnother(): void {
    this.showResults = false;
    this.selectedSign = null;
    this.result = null;
    this.form.reset();
  }
}
