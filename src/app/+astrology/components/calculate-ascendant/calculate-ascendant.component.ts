import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {isNil} from 'lodash';
import {debounceTime, distinctUntilChanged, filter, map, startWith, switchMap} from 'rxjs/operators';

import {ValidationService} from 'src/app/core/services/validation.service';
import {UserService} from '../../../core/services/user.service';
import {GeoApiService} from 'src/app/core/services/api/geo.api.service';
import {BaseSummary} from 'src/app/core/interfaces/base-summary';
import {AstrologyApiService} from 'src/app/core/services/api/astrology.api.service';
import {HoroscopeInterface} from 'src/app/shared/interfaces/horoscope.interface';
import {HoroscopeService} from 'src/app/core/services/horoscope.service';
import {NotificationService} from 'src/app/core/services/notification.service';

interface AscendantFormInterface {
  birthDate: string;
  birthTime: string;
  country: string;
  city: BaseSummary;
}

@UntilDestroy()
@Component({
  selector: 'nsp-calculate-ascendant',
  templateUrl: './calculate-ascendant.component.html',
  styleUrls: ['./calculate-ascendant.component.scss']
})
export class CalculateAscendantComponent implements OnInit {
  public showResult: boolean = false;

  public form: FormGroup<AscendantFormInterface>;
  public filteredCountries: Observable<string[]>;
  public filteredCities: Observable<BaseSummary[]>;
  public currentSign: HoroscopeInterface;
  public ascendantSign: HoroscopeInterface;
  public result: string;
  public startDate: Date = new Date();

  constructor(
    private readonly astrologyApiService: AstrologyApiService,
    private readonly geoApiService: GeoApiService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly horoscopeService: HoroscopeService,
    private readonly validationService: ValidationService,
    private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.startDate.setFullYear(this.startDate.getFullYear() - 18);

    this.form = this.formBuilder.group<AscendantFormInterface>({
      birthDate: ['', [Validators.required, this.validationService.olderThanValidator(72), this.validationService.youngerThanValidator(18)]],
      birthTime: null,
      country: ['', Validators.required],
      city: [null, Validators.required]
    });

    this.filteredCountries = this.form.controls.country.valueChanges
      .pipe(
        distinctUntilChanged(),
        startWith(''),
        debounceTime(300),
        switchMap(value => this.geoApiService.getCountries()
          .pipe(map(country => country.filter(item => item.toLowerCase().startsWith(value))))),
        untilDestroyed(this));

    this.filteredCities = this.form.controls.city.valueChanges
      .pipe(
        debounceTime(300),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(value => this.geoApiService.getCities(this.form.value.country, value)),
        untilDestroyed(this));

    this.userService.user$
      .pipe(
        filter(value => !!value),
        untilDestroyed(this))
      .subscribe(user => {
        this.form.controls.birthDate.setValue(user.birthday);
      });
  }

  public displayFn = (value: BaseSummary): string => value && value.name ? value.name : '';

  public submit(): void {
    const birthDateMoment = moment(this.form.value.birthDate);
    const day = birthDateMoment.date();
    const month = birthDateMoment.month();
    const year = birthDateMoment.year();
    const hour = isNil(this.form.value.birthTime) ? null : +this.form.value.birthTime.split(':')[0];
    const minute = isNil(this.form.value.birthTime) ? null : +this.form.value.birthTime.split(':')[1];

    this.currentSign = this.horoscopeService.getHoroscopeByDate(this.form.value.birthDate);

    this.astrologyApiService.getAscendantSign(day, month, year, hour, minute, this.form.value.city.id)
      .pipe(
        switchMap(value => {
          this.ascendantSign = value;

          return this.astrologyApiService.getAscendant(value.value, this.currentSign.value);
        }),
        untilDestroyed(this))
      .subscribe(response => {
          response = response.replace('\n', '<br/><br/>');
          this.result = response;
          this.showResult = true;
        },
        () => this.notificationService.error('error.commonError'));
  }

  public reset(): void {
    this.form.reset();
    this.showResult = false;
    this.result = null;
    this.ascendantSign = null;
  }
}
