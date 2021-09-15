// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {PsychicsRoutingModule} from './psychics-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

// components
import {PsychicsComponent} from './psychics.component';
import {ProfileMediumComponent} from './components/profile-medium/profile-medium.component';


@NgModule({
  declarations: [
    PsychicsComponent,
    ProfileMediumComponent
  ],
  imports: [
    SharedModule,
    PsychicsRoutingModule,
    NgxPaginationModule,
  ]
})
export class PsychicsModule {
}
