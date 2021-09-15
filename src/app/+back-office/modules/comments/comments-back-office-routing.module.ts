import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CommentsBackOfficeComponent} from './comments-back-office.component';

const routes: Routes = [
  {
    path: '',
    component: CommentsBackOfficeComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsBackOfficeRoutingModule {
}
