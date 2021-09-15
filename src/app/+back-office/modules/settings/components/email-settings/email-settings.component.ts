import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import {finalize} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';

import {NotificationService} from '../../../../../core/services/notification.service';
import {SpinnerService} from '../../../../../core/services/spinner.service';
import {SettingsApiService} from '../../../../../core/services/api/settings.api.service';
import {EmailSettings} from '../../../../../core/interfaces/settings/email-settings';

@UntilDestroy()
@Component({
  selector: 'nsp-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss']
})
export class EmailSettingsComponent implements OnInit {
  public form: FormGroup<EmailSettings>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly spinnerService: SpinnerService,
    private readonly settingsApiService: SettingsApiService) {
  }

  public ngOnInit(): void {
    this.spinnerService.showSpinner();

    this.settingsApiService.getEmailSettings()
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(value => {
        this.form = this.formBuilder.group<EmailSettings>({
          fromName: [value.data.fromName, Validators.required],
          fromAddress: [value.data.fromAddress, [Validators.required, Validators.email]],
          contactEmail: [value.data.contactEmail, [Validators.required, Validators.email]]
        });
      });
  }

  public save(): void {
    if (!this.form.valid) {
      return;
    }

    this.spinnerService.showSpinner();
    this.settingsApiService.saveEmailSettings(this.form.value)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(
        () => this.notificationService.success('success.commonSuccess'),
        () => this.notificationService.error('error.commonError'));
  }
}
