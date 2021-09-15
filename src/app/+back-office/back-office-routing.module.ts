import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BackOfficeComponent} from './back-office.component';

const routes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/users/users-back-office.module').then(m => m.UsersBackOfficeModule)
      },
      {
        path: 'psychics',
        loadChildren: () => import('./modules/psychics/psychics-back-office.module').then(m => m.PsychicsBackOfficeModule)
      },
      {
        path: 'comments',
        loadChildren: () => import('./modules/comments/comments-back-office.module').then(m => m.CommentsBackOfficeModule)
      },
      {
        path: 'consultations',
        loadChildren: () => import('./modules/consultations/consultations-back-office.module').then(m => m.ConsultationsBackOfficeModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings-back-office.module').then(m => m.SettingsBackOfficeModule)
      },
      {
        path: 'invoices',
        loadChildren: () => import('./modules/invoices/invoices-back-office.module').then(m => m.InvoicesBackOfficeModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('./modules/payments/payments-back-office.module').then(m => m.PaymentsBackOfficeModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./modules/event-logs/event-logs-back-office.module').then(m => m.EventLogsBackOfficeModule)
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule {
}
