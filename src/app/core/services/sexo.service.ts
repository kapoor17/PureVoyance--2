import {Injectable} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {SexoTestInterface} from 'src/app/shared/interfaces/sexo-test.interface';

@Injectable({
  providedIn: 'root'
})
export class SexoService {
  public sexoTests: SexoTestInterface[] = [
    {
      img: '/assets/images/sexo/dsh.png',
      title: this.translate.instant('sexo.dailySexHoroscopeFirstLabel'),
      subTitle: this.translate.instant('sexo.dailySexHoroscopeFirstSubLabel'),
      text: this.translate.instant('sexo.dailySexHoroscopeSecondLabel'),
      button: this.translate.instant('sexo.dailySexHoroscopeButtonLabel'),
      routePath: 'daily'
    },
    {
      img: '/assets/images/sexo/sw.png',
      title: this.translate.instant('sexo.yourSexWeekFirstLabel'),
      subTitle: this.translate.instant('sexo.yourSexWeekFirstSubLabel'),
      text: this.translate.instant('sexo.yourSexWeekSecondLabel'),
      button: this.translate.instant('sexo.yourSexWeekButtonLabel'),
      routePath: 'weekly'
    },
    {
      img: '/assets/images/sexo/sp.png',
      title: this.translate.instant('sexo.sexualPracticesFirstLabel'),
      subTitle: this.translate.instant('sexo.sexualPracticesFirstSubLabel'),
      text: this.translate.instant('sexo.sexualPracticesSecondLabel'),
      button: this.translate.instant('sexo.sexualPracticesButtonLabel'),
      routePath: 'seventh-heaven'
    }
  ];

  constructor(private readonly translate: TranslateService) {
  }
}
