import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AstrologyTestService} from '../core/services/astrology-test.service';

@Component({
  selector: 'nsp-horoscope',
  templateUrl: './astrology.component.html',
  styleUrls: ['./astrology.component.scss']
})
export class AstrologyComponent {
  constructor(
    public readonly astrologyTests: AstrologyTestService,
    private readonly router: Router) {
  }

  public get isMainPage(): boolean {
    return this.router.url.endsWith('astrology');
  }
}
