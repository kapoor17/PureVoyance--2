import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {EnumValues} from 'enum-values';
import {camelCase} from 'lodash';
import {filter} from 'rxjs/operators';
import * as moment from 'moment';

import {HoroscopeService} from 'src/app/core/services/horoscope.service';
import {HoroscopeInterface} from 'src/app/shared/interfaces/horoscope.interface';
import {HoroscopeApiService} from '../../core/services/api/horoscope.api.service';
import {HoroscopeResponse} from '../../core/interfaces/horoscopes/horoscope-response';
import {NotificationService} from '../../core/services/notification.service';
import {LanguageService} from 'src/app/core/services/language.service';

enum HoroscopePeriods {
  Today = 'day',
  Tomorrow = 'tomorrow',
  AfterTomorrow = 'aftertomorrow',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

@UntilDestroy()
@Component({
  selector: 'nsp-detailed-horoscope',
  templateUrl: './horoscope-details.component.html',
  styleUrls: ['./horoscope-details.component.scss']
})
export class HoroscopeDetailsComponent implements OnInit {
  public horoscope: HoroscopeInterface;
  public selectedPeriod: { name: string, value: HoroscopePeriods };
  public periodTypes: typeof HoroscopePeriods = HoroscopePeriods;

  public periods: { name: string, value: HoroscopePeriods }[] = EnumValues.getNamesAndValues(HoroscopePeriods)
    .map(item => ({
      value: item.value as HoroscopePeriods,
      name: item.value === HoroscopePeriods.Year
        ? `${moment().year()}`
        : `detailedHoroscope.${camelCase(item.name)}Label`
    }));

  public date: Date = new Date();
  public nextDay: Date = new Date();
  public afterTomorrowDay: Date = new Date();
  public firstDay: Date | string = new Date();
  public lastDay: Date | string = new Date();
  public currentMonth: string = '';
  public currentYear: number = moment().year();
  public data: HoroscopeResponse;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly languageService: LanguageService,
    private readonly notificationService: NotificationService,
    private readonly horoscopeApiService: HoroscopeApiService,
    private readonly horoscopeService: HoroscopeService) {

  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => value.has('type')),
        untilDestroyed(this))
      .subscribe(value => {
        this.horoscope = this.horoscopeService.horoscopes
          .find(item => item.value.toLowerCase() === value.get('type').toLowerCase());
        this.selectPeriod(this.periods[0]);
      });
  }

  public selectPeriod(period: { name: string, value: HoroscopePeriods }): void {
    let currentDate = moment().toISOString();
    let timespan: string = period.value;
    this.selectedPeriod = period;
    switch (period.value) {
      case HoroscopePeriods.Today:
        this.date = new Date();
        break;
      case HoroscopePeriods.Tomorrow:
        currentDate = moment().add(1, 'days').toISOString();
        timespan = HoroscopePeriods.Today;
        this.nextDay.setDate(this.date.getDate() + 1);
        break;
      case HoroscopePeriods.AfterTomorrow:
        currentDate = moment().add(2, 'days').toISOString();
        timespan = HoroscopePeriods.Today;
        this.afterTomorrowDay.setDate(this.date.getDate() + 2);
        break;
      case HoroscopePeriods.Week: {
        const today = new Date();
        const first = today.getDate() - today.getDay();
        const last = first + 6;
        this.firstDay = new Date(today.setDate(first)).toUTCString();
        this.lastDay = new Date(today.setDate(last)).toUTCString();
        break;
      }
      case HoroscopePeriods.Month:
        this.currentMonth = this.date.toString().slice(4, 8);
        break;
      case HoroscopePeriods.Year:
      default:
        break;
    }

    const currentLanguage = this.languageService.currentLanguage;
    this.horoscopeApiService.get(this.horoscope?.id, timespan, currentDate, currentLanguage)
      .pipe(untilDestroyed(this))
      .subscribe(value => {
          value.overviews.forEach(item => {
            const targetContent = value.contents.find(content => content.id === item.anchorId);
            if (!targetContent) {
              return;
            }

            targetContent.rating = item.rating;
          });

          this.data = value;
        },
        () => this.notificationService.error('error.commonError'));
  }
}

