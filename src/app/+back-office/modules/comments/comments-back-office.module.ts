// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';

// components
import {CommentsBackOfficeComponent} from './comments-back-office.component';
import {CommentsBackOfficeRoutingModule} from './comments-back-office-routing.module';


@NgModule({
  declarations: [
    CommentsBackOfficeComponent,
  ],
  imports: [
    SharedModule,
    CommentsBackOfficeRoutingModule
  ]
})
export class CommentsBackOfficeModule {
}
