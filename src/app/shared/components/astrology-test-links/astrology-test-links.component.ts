import {ChangeDetectionStrategy, Component} from '@angular/core';

import {AstrologyTestService} from '../../../core/services/astrology-test.service';

@Component({
  selector: 'nsp-astrology-test-links',
  templateUrl: './astrology-test-links.component.html',
  styleUrls: ['./astrology-test-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstrologyTestLinksComponent {
  constructor(public readonly astrologyTests: AstrologyTestService) {
  }
}
