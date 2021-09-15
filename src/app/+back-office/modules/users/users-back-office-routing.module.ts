import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAppointmentsComponent} from './components/user-appointments/user-appointments.component';
import {UserCommentsComponent} from './components/user-comments/user-comments.component';
import {UserConsultationsComponent} from './components/user-consultations/user-consultations.component';
import {UserCreditsComponent} from './components/user-credits/user-credits.component';

import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserInvoicesComponent} from './components/user-invoices/user-invoices.component';
import {UserPaymentsComponent} from './components/user-payments/user-payments.component';
import {UsersBackOfficeComponent} from './users-back-office.component';
import {UserManipulationComponent} from './components/user-manipulation/user-manipulation.component';

const routes: Routes = [
  {
    path: '',
    component: UsersBackOfficeComponent
  },
  {
    path: 'edit-user/:id',
    component: UserManipulationComponent
  },
  {
    path: 'create-user',
    component: UserManipulationComponent
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: 'consultations'
      },
      {
        path: 'consultations',
        component: UserConsultationsComponent
      },
      {
        path: 'appointments',
        component: UserAppointmentsComponent
      },
      {
        path: 'credits',
        component: UserCreditsComponent
      },
      {
        path: 'comments',
        component: UserCommentsComponent
      },
      {
        path: 'payments',
        component: UserPaymentsComponent
      },
      {
        path: 'invoices',
        component: UserInvoicesComponent
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersBackOfficeRoutingModule {
}
