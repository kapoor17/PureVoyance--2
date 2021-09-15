// modules
import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {InvoicesBackOfficeComponent} from './invoices-back-office.component';
import {InvoicesBackOfficeRoutingModule} from './invoices-back-office.routing.module';


@NgModule({
  declarations: [
    InvoicesBackOfficeComponent
  ],
  imports: [
    SharedModule,
    InvoicesBackOfficeRoutingModule
  ]
})
export class InvoicesBackOfficeModule {
}
