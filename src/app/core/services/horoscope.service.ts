import {Injectable} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

import {HoroscopeInterface} from '../../shared/interfaces/horoscope.interface';

@Injectable({
  providedIn: 'root'
})

export class HoroscopeService {
  public horoscopes: HoroscopeInterface[] = [
    {
      id: 1,
      title: this.translate.instant('horoscope.horoscopeAriesLabel'),
      picture: './assets/icons/horoscope/aries-icon.svg',
      value: 'aries',
      frenchId: 'belier'
    },
    {
      id: 2,
      title: this.translate.instant('horoscope.horoscopeTaurusLabel'),
      picture: './assets/icons/horoscope/taurus-icon.svg',
      value: 'taurus',
      frenchId: 'taureau'
    },
    {
      id: 3,
      title: this.translate.instant('horoscope.horoscopeGeminiLabel'),
      picture: './assets/icons/horoscope/gemini-icon.svg',
      value: 'gemini',
      frenchId: 'gemeaux'
    },
    {
      id: 4,
      title: this.translate.instant('horoscope.horoscopeCancerLabel'),
      picture: './assets/icons/horoscope/cancer-icon.svg',
      value: 'cancer',
      frenchId: 'cancer'
    },
    {
      id: 5,
      title: this.translate.instant('horoscope.horoscopeLionLabel'),
      picture: './assets/icons/horoscope/lion-icon.svg',
      value: 'lion',
      frenchId: 'lion'
    },
    {
      id: 6,
      title: this.translate.instant('horoscope.horoscopeVirgoLabel'),
      picture: './assets/icons/horoscope/virgo-icon.svg',
      value: 'virgo',
      frenchId: 'vierge'
    },
    {
      id: 7,
      title: this.translate.instant('horoscope.horoscopeLibraLabel'),
      picture: './assets/icons/horoscope/libra-icon.svg',
      value: 'libra',
      frenchId: 'balance'
    },
    {
      id: 8,
      title: this.translate.instant('horoscope.horoscopeScorpionLabel'),
      picture: './assets/icons/horoscope/scorpion-icon.svg',
      value: 'scorpion',
      frenchId: 'scorpion'
    },
    {
      id: 9,
      title: this.translate.instant('horoscope.horoscopeSagittariusLabel'),
      picture: './assets/icons/horoscope/sagittarius-icon.svg',
      value: 'sagittarius',
      frenchId: 'sagittaire'
    },
    {
      id: 10,
      title: this.translate.instant('horoscope.horoscopeCapricornLabel'),
      picture: './assets/icons/horoscope/capricorn-icon.svg',
      value: 'capricorn',
      frenchId: 'capricorne'
    },
    {
      id: 11,
      title: this.translate.instant('horoscope.horoscopeAquariusLabel'),
      picture: './assets/icons/horoscope/aquarius-icon.svg',
      value: 'aquarius',
      frenchId: 'verseau'
    },
    {
      id: 12,
      title: this.translate.instant('horoscope.horoscopePiscesLabel'),
      picture: './assets/icons/horoscope/pisces-icon.svg',
      value: 'pisces',
      frenchId: 'poissons'
    }
  ];

  constructor(private translate: TranslateService) {
  }

  public getHoroscopeByDate(date: string): HoroscopeInterface {
    const dateMoment = moment(date);
    if (!dateMoment.isValid()) {

      return null;
    }

    const month = dateMoment.month() + 1;
    const day = dateMoment.date();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
      return this.horoscopes.find(item => item.id === 1);
    } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
      return this.horoscopes.find(item => item.id === 2);
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return this.horoscopes.find(item => item.id === 3);
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      return this.horoscopes.find(item => item.id === 4);
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) {
      return this.horoscopes.find(item => item.id === 5);
    } else if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) {
      return this.horoscopes.find(item => item.id === 6);
    } else if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) {
      return this.horoscopes.find(item => item.id === 7);
    } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
      return this.horoscopes.find(item => item.id === 8);
    } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
      return this.horoscopes.find(item => item.id === 9);
    } else if ((month === 1 && day <= 20) || (month === 12 && day >= 22)) {
      return this.horoscopes.find(item => item.id === 10);
    } else if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) {
      return this.horoscopes.find(item => item.id === 11);
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return this.horoscopes.find(item => item.id === 12);
    } else {
      return null;
    }
  }
}
