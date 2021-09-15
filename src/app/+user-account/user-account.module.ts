import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UserAccountRoutingModule} from './user-account-routing.module';

import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {MyPsychicsComponent} from './components/my-psychics/my-psychics.component';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {ConsultationsComponent} from './components/consultations/consultations.component';
import {UserAccountComponent} from './user-account.component';

import {NgxPaginationModule} from 'ngx-pagination';
import {AppointmentsComponent} from './components/appointments/appointments.component';
import {CommentsComponent} from './components/comments/comments.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {ConsultationDetailsComponent} from './components/consultations/details-modal-window/consultation-details.component';
import {ConsultationCommentComponent} from './components/consultations/consultation-comment/consultation-comment.component';
import {ComunicationPreferencesComponent} from './components/comunication-preferences/comunication-preferences.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    MyPsychicsComponent,
    InvoicesComponent,
    ConsultationsComponent,
    UserAccountComponent,
    AppointmentsComponent,
    CommentsComponent,
    PaymentsComponent,
    ConsultationDetailsComponent,
    ConsultationCommentComponent,
    ComunicationPreferencesComponent,
  ],
  imports: [
    SharedModule,
    UserAccountRoutingModule,
    NgxPaginationModule
  ]
})
export class UserAccountModule {
}
