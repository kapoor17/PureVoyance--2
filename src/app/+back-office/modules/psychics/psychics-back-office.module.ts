// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {PsychicsBackOfficeRoutingModule} from './psychics-back-office.routing.module';

// components
import {PsychicsBackOfficeComponent} from './psychics-back-office.component';
import {PsychicDetailsComponent} from './components/psychic-details/psychic-details.component';
import {PsychicMainInfoComponent} from './components/psychic-main-info/psychic-main-info.component';
import {PsychicConsultationsComponent} from './components/psychic-consultations/psychic-consultations.component';
import {PsychicCommentsComponent} from './components/psychic-comments/psychic-comments.component';
import {PsychicAppointmentsComponent} from './components/psychic-appointments/psychic-appointments.component';
import {PsychicEditComponent} from './components/psychic-edit/psychic-edit.component';


@NgModule({
  declarations: [
    PsychicsBackOfficeComponent,
    PsychicDetailsComponent,
    PsychicMainInfoComponent,
    PsychicConsultationsComponent,
    PsychicCommentsComponent,
    PsychicAppointmentsComponent,
    PsychicEditComponent
  ],
  imports: [
    SharedModule,
    PsychicsBackOfficeRoutingModule
  ]
})
export class PsychicsBackOfficeModule {
}
