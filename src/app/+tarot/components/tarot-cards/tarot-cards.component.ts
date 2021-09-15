import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

import {TarotService} from '../../../core/services/toggle-tarot.service';
import {TarotInterface} from '../../../shared/interfaces/tarot.interface';
import {TarotApiService} from 'src/app/core/services/api/tarot.api.service';
import {DailyLoveHoroscope} from 'src/app/core/interfaces/horoscopes/daily-love-horoscope';
import {NotificationService} from 'src/app/core/services/notification.service';

@UntilDestroy()
@Component({
  selector: 'nsp-tarot-cards',
  templateUrl: './tarot-cards.component.html',
  styleUrls: ['./tarot-cards.component.scss']
})
export class TarotCardsComponent implements OnInit {
  public result: DailyLoveHoroscope[] = [];
  public selectedPack: TarotInterface;
  public cardsClosed: Array<string> = [];
  public cardsClosedDown: string[];
  public openCards = [
    '/assets/images/tarot/tarot-cards-images/first-open-card-image.png',
    '/assets/images/tarot/tarot-cards-images/second-open-card-image.png',
    '/assets/images/tarot/tarot-cards-images/third-open-card-image.png',
    '/assets/images/tarot/tarot-cards-images/fourth-open-card-image.png',
    '/assets/images/tarot/tarot-cards-images/fifth-open-card-image.png',
    '/assets/images/tarot/tarot-cards-images/sixth-open-card-image.png'
  ];

  public titles = [
    this.translateService.instant('tarot.tarotCards.loveLabel'),
    this.translateService.instant('tarot.tarotCards.silverLabel'),
    this.translateService.instant('tarot.tarotCards.vitalityLabel'),
    this.translateService.instant('tarot.tarotCards.workLabel'),
    this.translateService.instant('tarot.tarotCards.familyLabel'),
    this.translateService.instant('tarot.tarotCards.moodLabel'),
  ];

  public showResult: boolean;
  public n: number = 0;

  constructor(
    private readonly translateService: TranslateService,
    private readonly tarotService: TarotService,
    private readonly notificationService: NotificationService,
    private readonly tarotApiService: TarotApiService,
    private readonly activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => !!value.has('type')),
        untilDestroyed(this))
      .subscribe(value => {
        const type = value.get('type');
        this.selectedPack = this.tarotService.tarotPacks.find(item => item.routePath === type);
      });

    this.cardsClosed = Array(18).fill(this.selectedPack.card, 0, 17);
    this.cardsClosedDown = this.cardsClosed.slice(4, 9);
  }

  public selectCard(n: number): void {
    this.n += 1;
    this.cardsClosedDown.splice(n, 1, this.openCards[Math.floor(Math.random() * this.openCards.length)]);

    if (this.n === 5) {
      this.getResults();
    }
  }

  private getResults(): void {
    let endpointCall: Observable<DailyLoveHoroscope[] | string[]>;
    switch (this.selectedPack.routePath) {
      case 'love':
        endpointCall = this.tarotApiService.getLove();
        break;
      case 'marseille':
        endpointCall = this.tarotApiService.getMarseille();
        break;
      case 'labor':
        endpointCall = this.tarotApiService.getLabor();
        break;
    }

    endpointCall
      .pipe(untilDestroyed(this))
      .subscribe(
        result => {
          this.showResult = !this.showResult;
          switch (this.selectedPack.routePath) {
            case 'love': {
              const today = moment();
              const casted = result as DailyLoveHoroscope[];
              casted.forEach(item => {
                item.title = today.format('dddd DD MMMM YYYY');
                today.add(1, 'days');
              });

              this.result = casted;
              break;
            }
            case 'marseille': {
              const casted = result as string[];
              this.result = casted.map((item, index) => ({
                title: this.titles[index],
                text: item,
                quotes: null
              }));
              break;
            }
            case 'labor': {
              const casted = result as string[];
              const today = moment();
              this.result = casted.map((item, index) => {
                const result = {
                  title: today.format('dddd DD MMMM YYYY'),
                  text: item,
                  quotes: null
                };
                today.add(1, 'days');

                return result;
              });
            }
          }
        },
        () => this.notificationService.error('error.commonError'));
  }

  public hideCard(i: number): void {
    const card = Array.from(document.querySelectorAll('.tarot-card')) as HTMLElement[];
    card[i].style.opacity = '0';
  }
}

