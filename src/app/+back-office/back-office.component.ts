import {Component} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {LanguageInterface} from '../core/interfaces/language.interface';
import {LanguageService} from '../core/services/language.service';
import {languagesListConstant} from '../core/constants/languages-list.constant';


@Component({
  selector: 'nsp-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent {
  public isOpened: boolean = false;
  public languages: LanguageInterface[] = languagesListConstant;

  constructor(private readonly languageService: LanguageService) {
  }

  public toggle(drawer: MatDrawer): void {
    this.isOpened = drawer.opened;
    drawer.toggle();
  }

  public get currentLanguage(): LanguageInterface | undefined {
    return this.languages.find((element: LanguageInterface) => element.languageCode === this.languageService.currentLanguage);
  }

  public changeLanguage(languageCode: string): void {
    if (this.languageService.currentLanguage !== languageCode) {
      this.languageService.currentLanguage = languageCode;
    }
  }
}
