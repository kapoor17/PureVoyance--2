import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import {finalize} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';

import {NotificationService} from '../../../../../core/services/notification.service';
import {SpinnerService} from '../../../../../core/services/spinner.service';
import {SettingsApiService} from '../../../../../core/services/api/settings.api.service';
import {CallSettings} from '../../../../../core/interfaces/settings/call-settings';

@UntilDestroy()
@Component({
  selector: 'nsp-call-settings',
  templateUrl: './call-settings.component.html',
  styleUrls: ['./call-settings.component.scss']
})
export class CallSettingsComponent implements OnInit {
  public form: FormGroup<CallSettings>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly spinnerService: SpinnerService,
    private readonly settingsApiService: SettingsApiService) {
  }

  public ngOnInit(): void {
    this.spinnerService.showSpinner();

    this.settingsApiService.getCallSettings()
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(value => {
        this.form = this.formBuilder.group<CallSettings>({
          maxRetries: [value.data.maxRetries, [Validators.required, Validators.min(0)]],
          clientTelcoNumber: [value.data.clientTelcoNumber, Validators.required],
          callTimeToComment: [value.data.callTimeToComment, [Validators.required, Validators.min(0)]]
        });
      });
  }

  public save(): void {
    if (!this.form.valid) {
      return;
    }

    this.spinnerService.showSpinner();
    this.settingsApiService.saveCallSettings(this.form.value)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(
        () => this.notificationService.success('success.commonSuccess'),
        () => this.notificationService.error('error.commonError'));
  }
}
