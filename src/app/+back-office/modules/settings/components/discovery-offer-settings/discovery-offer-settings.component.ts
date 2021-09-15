import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {finalize} from 'rxjs/operators';

import {DiscoverOfferSettings} from 'src/app/core/interfaces/settings/discover-offer-settings';
import {SettingsApiService} from 'src/app/core/services/api/settings.api.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';

@UntilDestroy()
@Component({
  selector: 'nsp-discovery-offer-settings',
  templateUrl: './discovery-offer-settings.component.html',
  styleUrls: ['./discovery-offer-settings.component.scss']
})
export class DiscoveryOfferSettingsComponent implements OnInit {
  public form: FormGroup<DiscoverOfferSettings>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly spinnerService: SpinnerService,
    private readonly settingsApiService: SettingsApiService) {
  }

  public ngOnInit(): void {
    this.spinnerService.showSpinner();

    this.settingsApiService.getDiscoveryOfferSettings()
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(value => {
        this.form = this.formBuilder.group<DiscoverOfferSettings>({
          price: [value.data.price, [Validators.required, Validators.min(0)]],
          duration: [value.data.duration, [Validators.required, Validators.min(0)]],
          amount: [value.data.amount, [Validators.required, Validators.min(0)]],
          credits: [value.data.credits, [Validators.required, Validators.min(0)]]
        });
      });
  }

  public save(): void {
    if (!this.form.valid) {
      return;
    }

    this.spinnerService.showSpinner();
    this.settingsApiService.saveDiscoverySettings(this.form.value)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(
        () => this.notificationService.success('success.commonSuccess'),
        () => this.notificationService.error('error.commonError'));
  }
}
