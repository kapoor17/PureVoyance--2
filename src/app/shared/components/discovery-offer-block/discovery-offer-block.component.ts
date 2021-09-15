import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {SettingsApiService} from 'src/app/core/services/api/settings.api.service';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/interfaces/user/user';
import {MatDialog} from '@angular/material/dialog';
import {RechargeComponent} from '../../modules/recharge/recharge.component';

@UntilDestroy()
@Component({
  selector: 'nsp-discovery-offer-block',
  templateUrl: './discovery-offer-block.component.html',
  styleUrls: ['./discovery-offer-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscoveryOfferBlockComponent implements OnInit {
  public currentUser: User;

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    public readonly settingsApiService: SettingsApiService,
  ) {
  }

  public ngOnInit(): void {
    this.userService.user$
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  public openOffer(): void {
    this.dialog.open(RechargeComponent, {
      panelClass: 'custom-dialog',
      data: {
        isDiscovery: true
      }
    });
  }
}
