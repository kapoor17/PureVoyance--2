import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SettingsApiService} from 'src/app/core/services/api/settings.api.service';
import {AuthService} from '../../../core/services/api/auth.service';
import {SignUpComponent} from '../../../+auth/components/sign-up/sign-up.component';
import {MatDialog} from '@angular/material/dialog';
import {RechargeComponent} from '../../modules/recharge/recharge.component';

@Component({
  selector: 'nsp-offer-side-block',
  templateUrl: './offer-side-block.component.html',
  styleUrls: ['./offer-side-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferSideBlockComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    public readonly settingsApiService: SettingsApiService) {
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
