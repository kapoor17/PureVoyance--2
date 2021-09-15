// modules
import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {PaymentsBackOfficeComponent} from './payments-back-office.component';
import {PaymentsBackOfficeRoutingModule} from './payments-back-office.routing.module';


@NgModule({
  declarations: [
    PaymentsBackOfficeComponent
  ],
  imports: [
    SharedModule,
    PaymentsBackOfficeRoutingModule
  ]
})
export class PaymentsBackOfficeModule {
}
