import {Component} from '@angular/core';

import {PsychoTestService} from 'src/app/core/services/psycho-test.service';

@Component({
  selector: 'nsp-psycho-tests-links',
  templateUrl: './psycho-tests-links.component.html',
  styleUrls: ['./psycho-tests-links.component.scss']
})
export class PsychoTestsLinksComponent {
  constructor(public readonly psychoTestService: PsychoTestService) {
  }
}
