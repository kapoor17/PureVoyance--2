import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PaymentsBackOfficeComponent} from './payments-back-office.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsBackOfficeComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsBackOfficeRoutingModule {
}
