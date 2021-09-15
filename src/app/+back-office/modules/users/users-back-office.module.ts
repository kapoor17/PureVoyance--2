// modules
import {NgModule} from '@angular/core';
import {UsersBackOfficeRoutingModule} from './users-back-office-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';

// components
import {UsersBackOfficeComponent} from './users-back-office.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserMainInfoComponent} from './components/user-main-info/user-main-info.component';
import {UserConsultationsComponent} from './components/user-consultations/user-consultations.component';
import {UserAppointmentsComponent} from './components/user-appointments/user-appointments.component';
import {UserCreditsComponent} from './components/user-credits/user-credits.component';
import {UserCommentsComponent} from './components/user-comments/user-comments.component';
import {UserPaymentsComponent} from './components/user-payments/user-payments.component';
import {UserInvoicesComponent} from './components/user-invoices/user-invoices.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {UserManipulationComponent} from './components/user-manipulation/user-manipulation.component';
import {FreeCreditsModalComponent} from './components/user-main-info/free-credits-modal/free-credits-modal.component';

@NgModule({
  declarations: [
    UsersBackOfficeComponent,
    UserDetailsComponent,
    UserMainInfoComponent,
    UserConsultationsComponent,
    UserAppointmentsComponent,
    UserCreditsComponent,
    UserCommentsComponent,
    UserPaymentsComponent,
    UserInvoicesComponent,
    UserManipulationComponent,
    FreeCreditsModalComponent
  ],
  imports: [
    SharedModule,
    UsersBackOfficeRoutingModule,
    MatAutocompleteModule
  ]
})
export class UsersBackOfficeModule {
}
