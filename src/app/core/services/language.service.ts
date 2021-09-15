import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {languagesArrayConstant} from '../constants/languages-array.constant';

import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public languageCodes: string[] = languagesArrayConstant;

  constructor(private readonly translateService: TranslateService,
              @Inject(DOCUMENT) private readonly document: Document) {
  }

  public get currentLanguage(): string {
    const currentLanguage = localStorage.getItem('currentLanguageLocale');

    if (!currentLanguage) {
      this.setDefaultLocale();
      window.location.reload();
    }

    return <string>currentLanguage;
  }

  public set currentLanguage(lang: string) {
    localStorage.setItem('currentLanguageLocale', lang);
    this.document.documentElement.lang = lang;
    this.translateService.use(lang);
    window.location.reload();
  }

  private setDefaultLocale(): void {
    const lang = navigator.language;

    if (this.languageCodes.includes(lang)) {
      this.currentLanguage = lang;
    } else {
      this.currentLanguage = 'en';
    }
  }
}
