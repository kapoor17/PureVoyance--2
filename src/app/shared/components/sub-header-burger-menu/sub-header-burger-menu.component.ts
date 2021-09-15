import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {TranslateService} from '@ngx-translate/core';

import {AuthService} from '../../../core/services/api/auth.service';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/interfaces/user/user';
import {SignUpComponent} from '../../../+auth/components/sign-up/sign-up.component';
import {SignInComponent} from '../../../+auth/components/sign-in/sign-in.component';
import {LanguageInterface} from '../../../core/interfaces/language.interface';
import {languagesListConstant} from '../../../core/constants/languages-list.constant';
import {LanguageService} from '../../../core/services/language.service';
import {HamburgerService} from 'src/app/core/services/hamburger-service';

@UntilDestroy()
@Component({
  selector: 'nsp-sub-header-burger-menu',
  templateUrl: './sub-header-burger-menu.component.html',
  styleUrls: ['./sub-header-burger-menu.component.scss']
})
export class SubHeaderBurgerMenuComponent implements OnInit {
  public openedSlot: number;
  public user: User;
  public languages: LanguageInterface[] = languagesListConstant;

  public pages = [
    {
      iconPage: 'psychics-logo',
      routerLink: '../psychics',
      pageName: 'subHeader.physicsLabel',
      iconArrow: 'arrow-close'
    },
    {
      iconPage: 'horoscope-logo',
      routerLink: '../horoscope',
      pageName: 'subHeader.horoscopeLabel',
      iconArrow: 'arrow-close'
    },
    {
      iconPage: 'chat-live-logo',
      routerLink: '#',
      pageName: 'subHeader.chatLifeLabel',
      iconArrow: 'arrow-close'
    },
    {
      iconPage: 'astrology-logo',
      routerLink: '../astrology',
      pageName: 'subHeader.astrologyLabel',
      iconArrow: 'arrow-close'
    },
    {
      iconPage: 'psycho-test-logo',
      routerLink: '../psycho-tests',
      pageName: 'subHeader.psychoTestLabel',
      iconArrow: 'arrow-close'
    },
    {
      iconPage: 'tarot-logo',
      routerLink: '../tarot',
      pageName: 'subHeader.tarotLabel',
      iconArrow: 'arrow-close'
    },
    {
      iconPage: 'sexo-logo',
      routerLink: '../sexo',
      pageName: 'subHeader.sexoLabel',
      iconArrow: 'arrow-close'
    },
    {
      iconPage: 'forums-logo',
      routerLink: '#',
      pageName: 'subHeader.forumsLabel',
      iconArrow: ''
    }
  ];
  public consultationBlocks = [
    {
      image: '/assets/icons/burger-menu/tel-icon.svg',
      class: 'white-back',
      title: 'tel'
    },
    {
      image: '/assets/icons/burger-menu/chat-icon.svg',
      class: 'gold-back',
      title: this.translate.instant('headerBurgerMenu.chatLabel')
    },
    {
      image: '/assets/icons/burger-menu/sms-icon.svg',
      class: 'gold-back',
      title: 'sms'
    },
    {
      image: '/assets/icons/burger-menu/audio-icon.svg',
      class: 'gold-back',
      title: 'audio'
    }
  ];

  constructor(public readonly authService: AuthService,
              public readonly userService: UserService,
              private readonly translate: TranslateService,
              private readonly hamburgerService: HamburgerService,
              private readonly dialog: MatDialog,
              private readonly router: Router,
              private languageService: LanguageService) {
  }

  public ngOnInit(): void {
    this.userService.user$
      .pipe(
        untilDestroyed(this))
      .subscribe(user => {
        this.user = user;
      });

    // this.isAuthenticated();
  }

  public close(): void {
    this.hamburgerService.toggle();
  }

  public closePage(close: boolean): void {
    this.hamburgerService.toggle();
    this.hamburgerService.accountMenu = close;
    this.close();
  }

  public subPage(i: number): void {
    this.openedSlot = this.openedSlot === i ? null : i;
  }

  public onSignUpButton(): void {
    this.dialog.open(SignUpComponent);
  }

  public onSignInButton(): void {
    this.dialog.open(SignInComponent);
  }

  public onLogout(): void {
    this.authService.logOut()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.userService.reset());

    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
    this.router.navigate(['']);
    this.authService.changeAuthenticatedStatus(false);
  }

  // public isAuthenticated(): void {
  //   this.authService.isAuthenticated$
  //     // .pipe(untilDestroyed(this))
  //     // .subscribe(value => {
  //     //   this.pages = value
  //     //     ? [...this.pages, {
  //     //       iconPage: 'profile',
  //     //       routerLink: '../user-account-menu',
  //     //       pageName: this.translate.instant('userAccount.myProfileLabel'),
  //     //       iconArrow: 'arrow-close'
  //     //     }]
  //     //     : this.pages.filter(item => item.iconPage !== 'profile');
  //     // });
  // }

  public get currentLanguage(): LanguageInterface | undefined {
    return this.languages.find((element: LanguageInterface) => element.languageCode === this.languageService.currentLanguage);
  }

  public changeLanguage(languageCode: string): void {
    if (this.languageService.currentLanguage !== languageCode) {
      this.languageService.currentLanguage = languageCode;
    }
  }
}
