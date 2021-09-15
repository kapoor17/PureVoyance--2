import {Injectable} from '@angular/core';
import {AstroSectionsInterface} from '../../shared/interfaces/astro-sections.interface';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AstroSectionsService {
  public sectionSecond: AstroSectionsInterface[] = [
    {
      img: 'assets/images/horoscope/eye-color-image.png',
      text: 'astrology.eyeColorLabel'
    },
    {
      img: 'assets/images/psycho-test/hair-color-image.png',
      text: 'astrology.hairColorLabel'
    },
    {
      img: 'assets/images/psycho-test/compatibility-sexual-image.png',
      text: 'astrology.compatibilityLabel'
    },
    {
      img: 'assets/images/psycho-test/affinities-according-astrology-image.png',
      text: 'astrology.affinitiesLabel'
    }
  ];

  public sectionFirst: AstroSectionsInterface[] = [
    {
      img: 'assets/images/horoscope/kiss-image.png',
      text: 'astrology.howToKissLabel'
    },
    {
      img: 'assets/images/horoscope/affinities-numerology-image.png',
      text: 'astrology.numerologyLabel'
    },
    {
      img: 'assets/images/psycho-test/money-problems-image.png',
      text: 'astrology.moneyProblemsLabel'
    },
    {
      img: 'assets/images/horoscope/chinese-signs-image.png',
      text: 'astrology.chineseLabel'
    }
  ];

  public selectTest!: AstroSectionsInterface;

  constructor(private readonly translate: TranslateService) {
  }
}
