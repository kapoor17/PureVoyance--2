import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AstrologyTestService} from '../core/services/astrology-test.service';

@Component({
  selector: 'nsp-horoscope',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.scss']
})
export class HoroscopeComponent {
  constructor(
    private readonly router: Router,
    public readonly astrologyTests: AstrologyTestService) {
  }

  public get isListPage(): boolean {
    return this.router.url.toString().endsWith('horoscope');
  }
}
