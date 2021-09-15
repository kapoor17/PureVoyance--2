import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PsychicAppointmentsComponent} from './components/psychic-appointments/psychic-appointments.component';
import {PsychicCommentsComponent} from './components/psychic-comments/psychic-comments.component';
import {PsychicConsultationsComponent} from './components/psychic-consultations/psychic-consultations.component';
import {PsychicDetailsComponent} from './components/psychic-details/psychic-details.component';
import {PsychicsBackOfficeComponent} from './psychics-back-office.component';
import {PsychicEditComponent} from './components/psychic-edit/psychic-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PsychicsBackOfficeComponent
  },
  {
    path: 'psychic-edit/:id',
    component: PsychicEditComponent
  },
  {
    path: ':id',
    component: PsychicDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: 'consultations'
      },
      {
        path: 'consultations',
        component: PsychicConsultationsComponent
      },
      {
        path: 'appointments',
        component: PsychicAppointmentsComponent
      },
      {
        path: 'comments',
        component: PsychicCommentsComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychicsBackOfficeRoutingModule {
}
