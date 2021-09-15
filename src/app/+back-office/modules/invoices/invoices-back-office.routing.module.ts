import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InvoicesBackOfficeComponent} from './invoices-back-office.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesBackOfficeComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesBackOfficeRoutingModule {
}
