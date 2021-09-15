import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HoroscopeTestInterface} from '../../shared/interfaces/horoscope-test.interface';
import {HoroscopeTestValueInterface} from '../../shared/interfaces/horoscope-test-value.interface';

@Injectable({
  providedIn: 'root'
})
export class AstrologyTestService {
  public horoscopeTests: HoroscopeTestValueInterface[] = [
    {
      img: './assets/images/horoscope/article-first-image.png',
      titleFirst: this.translate.instant('horoscope.articlesFirstPartFirstTextLabel'),
      titleSecond: this.translate.instant('horoscope.articlesSecondPartFirstTextLabel'),
      textAbout: this.translate.instant('horoscope.articlesSecondTextLabel'),
      subTitle: this.translate.instant('horoscope.ascendentSubTitleTestLabel'),
      button: this.translate.instant('horoscope.articlesFirstButtonLabel'),
      routePath: 'calculate-ascendant'
    },
    {
      img: './assets/images/horoscope/article-second-image.png',
      titleFirst: this.translate.instant('horoscope.articlesFirstPartThirdTextLabel'),
      titleSecond: this.translate.instant('horoscope.articlesSecondPartThirdTextLabel'),
      textAbout: this.translate.instant('horoscope.articlesFourthTextLabel'),
      subTitle: this.translate.instant('horoscope.ascendentSubTitleTestLabel'),
      button: this.translate.instant('horoscope.articlesSecondButtonLabel'),
      routePath: 'astro-character'
    },
    {
      img: './assets/images/horoscope/article-third-image.png',
      titleFirst: this.translate.instant('horoscope.articlesFirstPartFifthTextLabel'),
      titleSecond: this.translate.instant('horoscope.articlesSecondPartFifthTextLabel'),
      textAbout: this.translate.instant('horoscope.articlesSixthTextLabel'),
      subTitle: this.translate.instant('horoscope.lovingBehaviorSubTitleTextLabel'),
      button: this.translate.instant('horoscope.articlesThirdButtonLabel'),
      routePath: 'loving-behavior'
    },
  ];

  public showTests: HoroscopeTestInterface;

  constructor(private readonly translate: TranslateService) {
  }

  public openHoroscopeTest(i: number): void {
    this.showTests = {horoscopeTestValue: this.horoscopeTests[i], index: i};
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
}
