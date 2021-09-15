import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {NgxStronglyTypedFormsModule} from 'ngx-strongly-typed-forms';
import {NgxMaskModule} from 'ngx-mask';

import {SharedModule} from '../shared/shared.module';
import {AuthModule} from '../+auth/auth.module';

// components
import {FooterComponent} from './components/footer/footer.component';
import {ForbiddenComponent} from './components/forbidden-page/forbidden.component';
import {HeaderComponent} from './components/header/header.component';
import {LanguageSelectComponent} from './components/language-select/language-select.component';
import {NotFoundComponent} from './components/not-found-page/not-found.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {SubFooterComponent} from './components/sub-footer/sub-footer.component';
import {SubHeaderComponent} from './components/sub-header/sub-header.component';
import {SnackbarComponent} from './components/snackbar/snackbar.component';

import {JWTInterceptor} from './helpers/interceptor.interceptor';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {RechargeModule} from '../shared/modules/recharge/recharge.module';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', `.json?v=${new Date().getTime()}`);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    MatCarouselModule.forRoot(),
    NgxStronglyTypedFormsModule,
    RechargeModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SubHeaderComponent,
    SubFooterComponent,
    SpinnerComponent,
    SnackbarComponent,
    SharedModule,
    ConfirmationDialogComponent
  ],
  declarations: [
    FooterComponent,
    ForbiddenComponent,
    HeaderComponent,
    LanguageSelectComponent,
    NotFoundComponent,
    SpinnerComponent,
    SubFooterComponent,
    SubHeaderComponent,
    SnackbarComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [SnackbarComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
