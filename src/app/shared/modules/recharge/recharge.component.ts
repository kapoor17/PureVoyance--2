import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Router} from '@angular/router';
import {RechargeService} from './recharge.service';
import {SettingsApiService} from '../../../core/services/api/settings.api.service';

enum RechargeStep {
  SelectPackage = 0,
  ConfirmPackage = 1,
  EnterPayment = 2,
  Finish = 3
}

@UntilDestroy()
@Component({
  selector: 'nsp-recharger',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent {
  public rechargeSteps: typeof RechargeStep = RechargeStep;
  public currentStep: RechargeStep;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { isDiscovery: boolean },
    public readonly rechargeService: RechargeService,
    private readonly router: Router,
    private readonly settingsApiService: SettingsApiService,
    private readonly dialogRef: MatDialogRef<RechargeComponent>) {
    this.currentStep = this.data?.isDiscovery
      ? RechargeStep.ConfirmPackage
      : RechargeStep.SelectPackage;

    if (!this.data?.isDiscovery) {
      return;
    }

    this.settingsApiService.getDiscoveryOfferSettings()
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.rechargeService.selectPackage({
          amount: value.data.amount,
          credits: value.data.credits,
          extra_amount: 0,
          extra_credits: 0,
          id: null,
          star_key: null,
          active: true,
          market: '',
          order: 0
        });
      });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public stepDone(index: RechargeStep): void {
    if (index === RechargeStep.Finish) {
      this.dialogRef.close();
      this.router.navigate(['/']);

      return;
    }

    this.currentStep = RechargeStep[RechargeStep[index + 1]];
  }

  public goBack(index: RechargeStep): void {
    this.currentStep = RechargeStep[RechargeStep[index - 1]];
  }
}
