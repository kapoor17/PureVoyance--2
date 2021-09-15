import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {LanguageService} from '../../services/language.service';
import {LanguageInterface} from '../../interfaces/language.interface';
import {languagesListConstant} from '../../constants/languages-list.constant';

import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/api/auth.service';

import {SignUpComponent} from '../../../+auth/components/sign-up/sign-up.component';
import {SignInComponent} from '../../../+auth/components/sign-in/sign-in.component';
import {RechargeComponent} from 'src/app/shared/modules/recharge/recharge.component';
import {User} from '../../interfaces/user/user';
import {HamburgerService} from '../../services/hamburger-service';

@UntilDestroy()
@Component({
  selector: 'nsp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public languages: LanguageInterface[] = languagesListConstant;
  public currentUser: User;
  public opened: boolean;

  constructor(
    private readonly languageService: LanguageService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly hamburgerService: HamburgerService,
    public readonly authService: AuthService,
    public readonly userService: UserService) {
  }

  public ngOnInit(): void {
    this.getUser();
  }

  public get currentLanguage(): LanguageInterface | undefined {
    return this.languages.find((element: LanguageInterface) => element.languageCode === this.languageService.currentLanguage);
  }

  public changeLanguage(languageCode: string): void {
    if (this.languageService.currentLanguage !== languageCode) {
      this.languageService.currentLanguage = languageCode;
    }
  }

  public onSignUpButton(): void {
    this.dialog.open(SignUpComponent);
  }

  public onSignInButton(): void {
    this.dialog.open(SignInComponent);
  }

  public onRecharger(): void {
    this.dialog.open(RechargeComponent, {
      panelClass: 'custom-dialog'
    });
  }

  public getUser(): void {
    this.userService.user$
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  public onLogout(): void {
    this.authService.logOut()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.userService.reset());

    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
    this.router.navigate(['']);
    this.authService.changeAuthenticatedStatus(true);
  }

  public toggleSidebar(chooseSide: boolean): void {
    this.hamburgerService.toggle();
    this.hamburgerService.accountMenu = chooseSide;

  }

  // public openUserAccount(): void {
  //   this.hamburgerService.accountMenu = !this.hamburgerService.accountMenu;
  // }
}
