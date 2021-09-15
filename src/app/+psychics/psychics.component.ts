import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {AuthService} from '../core/services/api/auth.service';
import {SettingsApiService} from '../core/services/api/settings.api.service';
import {PsychicsService} from '../core/services/psychic.service';
import {UserService} from '../core/services/user.service';
import {SignUpComponent} from '../+auth/components/sign-up/sign-up.component';
import {MatDialog} from '@angular/material/dialog';
import {RechargeComponent} from '../shared/modules/recharge/recharge.component';
import {User} from '../core/interfaces/user/user';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'nsp-psychics',
  templateUrl: './psychics.component.html',
  styleUrls: ['./psychics.component.scss']
})
export class PsychicsComponent implements OnInit {
  public filterForm: FormGroup<{ search: string, skillId: number, status: string }>;
  public currentUser: User;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly psychicService: PsychicsService,
    public readonly settingsApiService: SettingsApiService,
    public readonly userService: UserService,
    private readonly dialog: MatDialog,
    public readonly authService: AuthService) {
  }

  public ngOnInit(): void {
    this.filterForm = this.formBuilder.group<{ search: string, skillId: number, status: string }>({
      search: '',
      skillId: null,
      status: null
    });

    this.getUser();
  }

  public getUser(): void {
    this.userService.user$.pipe(untilDestroyed(this)).subscribe(user => {
      this.currentUser = user;
    });
  }

  public submit(): void {
    if (this.authService.isAuthenticated) {
      this.dialog.open(RechargeComponent, {
        panelClass: 'custom-dialog',
        data: {
          isDiscovery: true
        }
      });
    } else {
      this.dialog.open(SignUpComponent);
    }
  }
}
