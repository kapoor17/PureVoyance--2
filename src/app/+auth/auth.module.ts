// modules
import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

// components
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SIGN_IN_TOKEN} from './helpers/sign-in-token';


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    TranslateModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    SignUpComponent,
    SignInComponent
  ],
  providers: [
    {provide: SIGN_IN_TOKEN, useValue: SignInComponent}
  ]
})
export class AuthModule {
}
