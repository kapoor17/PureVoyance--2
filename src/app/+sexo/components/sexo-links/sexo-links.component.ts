import {Component} from '@angular/core';

import {SexoService} from 'src/app/core/services/sexo.service';

@Component({
  selector: 'nsp-sexo-links',
  templateUrl: './sexo-links.component.html',
  styleUrls: ['./sexo-links.component.scss']
})
export class SexoLinksComponent {
  constructor(public readonly sexoService: SexoService) {
  }
}
