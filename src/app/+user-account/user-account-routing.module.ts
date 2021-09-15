import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ConsultationsComponent} from './components/consultations/consultations.component';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {MyPsychicsComponent} from './components/my-psychics/my-psychics.component';
import {UserAccountComponent} from './user-account.component';
import {AppointmentsComponent} from './components/appointments/appointments.component';
import {CommentsComponent} from './components/comments/comments.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {ComunicationPreferencesComponent} from './components/comunication-preferences/comunication-preferences.component';

const routes: Routes = [
  {
    path: '',
    component: UserAccountComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'consultations',
        component: ConsultationsComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent
      },
      {
        path: 'my-psychics',
        component: MyPsychicsComponent
      },
      {
        path: 'appointments',
        component: AppointmentsComponent
      },
      {
        path: 'comments',
        component: CommentsComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'communication-preferences',
        component: ComunicationPreferencesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule {
}
