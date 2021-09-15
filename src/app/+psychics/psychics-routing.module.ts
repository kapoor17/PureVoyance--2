import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileMediumComponent} from './components/profile-medium/profile-medium.component';

// components
import {PsychicsComponent} from './psychics.component';


const routes: Routes = [
  {
    path: '',
    component: PsychicsComponent
  },
  {
    path: ':id',
    component: ProfileMediumComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychicsRoutingModule {
}
