import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../core/services/user.service';
import {AuthService} from '../../../core/services/api/auth.service';
import {Router} from '@angular/router';
import {RechargeComponent} from '../../modules/recharge/recharge.component';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {LanguageInterface} from '../../../core/interfaces/language.interface';
import {languagesListConstant} from '../../../core/constants/languages-list.constant';
import {LanguageService} from '../../../core/services/language.service';
import {Location} from '@angular/common';
import {User} from '../../../core/interfaces/user/user';
import {HamburgerService} from '../../../core/services/hamburger-service';

@UntilDestroy()
@Component({
  selector: 'nsp-user-account-menu',
  templateUrl: './user-account-menu.component.html',
  styleUrls: ['./user-account-menu.component.scss']
})
export class UserAccountMenuComponent implements OnInit {
  public user: User;
  public credits: number;
  public languages: LanguageInterface[] = languagesListConstant;


  constructor(private readonly dialog: MatDialog,
              private readonly userService: UserService,
              public authService: AuthService,
              private location: Location,
              private router: Router,
              private readonly hamburgerService: HamburgerService,
              private readonly languageService: LanguageService) {
  }

  public ngOnInit(): void {
    this.userService.user$
      .pipe(
        untilDestroyed(this))
      .subscribe(user => {
        this.user = user;
        this.credits = user?.total_credits;
      });

  }

  public recharge(): void {
    this.dialog.open(RechargeComponent, {
      panelClass: 'custom-dialog'
    });
  }
  public get currentLanguage(): LanguageInterface | undefined {
    return this.languages.find((element: LanguageInterface) => element.languageCode === this.languageService.currentLanguage);
  }

  public changeLanguage(languageCode: string): void {
    if (this.languageService.currentLanguage !== languageCode) {
      this.languageService.currentLanguage = languageCode;
    }
  }

  public onLogOut(): void {
    this.authService.logOut()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.userService.reset());

    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
    this.router.navigate(['']);
    this.authService.changeAuthenticatedStatus(false);
  }

  public close(): void {
    this.hamburgerService.toggle();
  }
}
