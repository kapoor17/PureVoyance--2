import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConsultationsBackOfficeComponent} from './consultations-back-office.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultationsBackOfficeComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationsBackOfficeRoutingModule {
}
