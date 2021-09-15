// modules
import {NgModule} from '@angular/core';
import {BackOfficeRoutingModule} from './back-office-routing.module';
import {SharedModule} from '../shared/shared.module';

// components
import {BackOfficeComponent} from './back-office.component';


@NgModule({
  declarations: [
    BackOfficeComponent
  ],
  imports: [
    SharedModule,
    BackOfficeRoutingModule
  ]
})
export class BackOfficeModule {
}
