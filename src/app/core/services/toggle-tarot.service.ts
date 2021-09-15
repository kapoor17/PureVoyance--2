import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {TarotInterface} from '../../shared/interfaces/tarot.interface';

@Injectable({
  providedIn: 'root'
})
export class TarotService {
  public tarotPacks: TarotInterface[] = [
    {
      id: 1,
      image: '/assets/images/tarot/love-tarot-image.png',
      titleText: this.translate.instant('tarot.loveTarotBlockFirstLabel'),
      descriptionText: this.translate.instant('tarot.loveTarotBlockSecondLabel'),
      card: '/assets/icons/tarot/tarot-love-icon.svg',
      routePath: 'love'
    },
    {
      id: 2,
      image: '/assets/images/tarot/tarot-of-maraelles-image.png',
      titleText: this.translate.instant('tarot.tarotOfMarseillesFirstLabel'),
      descriptionText: this.translate.instant('tarot.tarotOfMarseillesSecondLabel'),
      card: '/assets/icons/tarot/tarot-marsielle-icon.svg',
      routePath: 'marseille'
    },
    {
      id: 3,
      image: '/assets/images/tarot/professional-special-draw-image.png',
      titleText: this.translate.instant('tarot.laborFirstLabel'),
      descriptionText: this.translate.instant('tarot.laborSecondLabel'),
      card: '/assets/icons/tarot/tarot-labor-icon.svg',
      routePath: 'labor'
    }
  ];

  constructor(private readonly translate: TranslateService) {
  }
}
