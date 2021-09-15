import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {PsychicRegistrationRoutingModule} from './psychic-registration-routing.module';

// components
import {ExperienceComponent} from './experience/experience.component';
import {ProStatusComponent} from './pro-status/pro-status.component';
import {ProfileComponent} from './profile/profile.component';
import {RegistrationListComponent} from './registration-list/registration-list.component';
import {SignUpPsychicComponent} from './sign-up-psychic/sign-up-psychic.component';
import {CompletionComponent} from './completion/completion.component';


@NgModule({
  declarations: [
    ExperienceComponent,
    ProStatusComponent,
    ProfileComponent,
    RegistrationListComponent,
    SignUpPsychicComponent,
    CompletionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PsychicRegistrationRoutingModule
  ]
})
export class PsychicRegistrationModule {
}
