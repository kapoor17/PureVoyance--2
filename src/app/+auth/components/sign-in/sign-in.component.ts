import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';

import {finalize} from 'rxjs/operators';

import {SpinnerService} from '../../../core/services/spinner.service';
import {AuthService} from '../../../core/services/api/auth.service';
import {NotificationService} from '../../../core/services/notification.service';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {SignIn} from 'src/app/shared/interfaces/sign-in.interface';
import {UserService} from 'src/app/core/services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {SignUpComponent} from '../sign-up/sign-up.component';


@UntilDestroy()
@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public showPassword: boolean = false;
  public loginInvalid: boolean = false;
  public title: string = this.translateService.instant('header.loginLabel');

  public signInForm!: FormGroup<SignIn>;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly spinnerService: SpinnerService,
              private readonly authService: AuthService,
              private readonly dialog: MatDialog,
              private readonly userService: UserService,
              private readonly notificationService: NotificationService,
              private readonly translateService: TranslateService) {
  }

  public ngOnInit(): void {
    this.signInForm = this.formBuilder.group<SignIn>({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required]
    });
  }

  public onSignIn(): void {
    if (!this.signInForm?.valid) {
      return;
    }

    this.loginInvalid = false;
    this.spinnerService.showSpinner();
    this.authService
      .signIn(this.signInForm.value)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this)
      )
      .subscribe(
        (result) => {
          localStorage.setItem('accessToken', result.access_token);
          localStorage.setItem('expiresIn', `${this.getExpiration(result.expires_in)}`);
          this.authService.changeAuthenticatedStatus(true);

          this.authService.getUser()
            .pipe(
              finalize(() => this.dialog.closeAll()),
              untilDestroyed(this)
            )
            .subscribe(
              (value) => {
                this.userService.onUserLoaded(value);
              });
        },
        () => {
          this.loginInvalid = true;
          this.signInForm?.patchValue({
            password: ''
          });
          this.notificationService.error('error.signIn');
        });
  }

  public onNotRegistered(): void {
    this.dialog.closeAll();
    this.dialog.open(SignUpComponent);
  }

  public onClose(event): void {
    this.dialog.closeAll();
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public onForgotPassword(): void {
    this.dialog.closeAll();
    this.dialog.open(ForgotPasswordComponent);
  }

  private getExpiration = (expiresIn: number): number => expiresIn + (new Date().getTime() / 1000);
}
