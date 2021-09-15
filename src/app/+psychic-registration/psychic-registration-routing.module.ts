import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {SignUpPsychicComponent} from './sign-up-psychic/sign-up-psychic.component';
import {RegistrationListComponent} from './registration-list/registration-list.component';
import {ProfileComponent} from './profile/profile.component';
import {ProStatusComponent} from './pro-status/pro-status.component';
import {ExperienceComponent} from './experience/experience.component';
import {CompletionComponent} from './completion/completion.component';


const routes: Routes = [
  {
    path: 'sign-up-psychic',
    component: SignUpPsychicComponent
  },
  {
    path: 'registration-list',
    component: RegistrationListComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'pro-status',
    component: ProStatusComponent
  },
  {
    path: 'experience',
    component: ExperienceComponent
  },
  {
    path: 'completion',
    component: CompletionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychicRegistrationRoutingModule {
}
