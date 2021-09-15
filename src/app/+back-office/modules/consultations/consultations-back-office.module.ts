// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {ConsultationsBackOfficeRoutingModule} from './consultations-back-office-routing.module';

// components
import {ConsultationsBackOfficeComponent} from './consultations-back-office.component';


@NgModule({
  declarations: [
    ConsultationsBackOfficeComponent,
  ],
  imports: [
    SharedModule,
    ConsultationsBackOfficeRoutingModule
  ]
})
export class ConsultationsBackOfficeModule {
}
