import {Component, OnInit} from '@angular/core';
import {RechargeComponent} from '../shared/modules/recharge/recharge.component';

import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {UserService} from '../core/services/user.service';
import {AuthService} from '../core/services/api/auth.service';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'nsp-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  public credits: number;

  constructor(private readonly dialog: MatDialog,
              private readonly userService: UserService,
              private authService: AuthService,
              private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.getCredits();
  }

  public recharge(): void {
    this.dialog.open(RechargeComponent, {
      panelClass: 'custom-dialog'
    });
  }

  public getCredits(): void {
    this.userService.user$.pipe(untilDestroyed(this))
      .subscribe(user => {
        if (user) {
          this.credits = user.total_credits;
        }
      });
  }

  public onLogOut(): void {
    this.authService.logOut()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.userService.reset());

    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
    this.authService.changeAuthenticatedStatus(false);
    this.router.navigate(['']);
  }
}

