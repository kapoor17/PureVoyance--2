import {Component, Inject, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';

import {finalize} from 'rxjs/operators';

import {AuthService} from '../../../core/services/api/auth.service';
import {SpinnerService} from '../../../core/services/spinner.service';
import {NotificationService} from '../../../core/services/notification.service';
import {SIGN_IN_TOKEN} from '../../helpers/sign-in-token';
import {ForgotPassword} from 'src/app/core/interfaces/auth/forgot-password.interface';
import {TranslateService} from '@ngx-translate/core';


@UntilDestroy()
@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public buttonClicked: boolean = false;
  public title: string = this.translateService.instant('signUp.resetPasswordTitle');
  public isDisable: boolean = true;
  public form!: FormGroup<ForgotPassword>;

  constructor(@Inject(SIGN_IN_TOKEN) private component: ComponentType<any>,
              private readonly formBuilder: FormBuilder,
              private readonly auth: AuthService,
              private readonly spinnerService: SpinnerService,
              private readonly dialog: MatDialog,
              private readonly notificationService: NotificationService,
              private readonly translateService: TranslateService) {
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group<ForgotPassword>({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

  public openSignIn(): void {
    this.dialog.closeAll();
    this.dialog.open(this.component);
  }

  public onClose(event): void {
    this.dialog.closeAll();
  }

  public onForgotPassword(): void {
    if (!this.form.valid) {

      return;
    }

    this.spinnerService.showSpinner();
    this.auth.forgotPassword(this.form.value)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this)
      )
      .subscribe(
        () => this.buttonClicked = true,
        () => this.notificationService.error('error.commonError')
      );
  }
}

