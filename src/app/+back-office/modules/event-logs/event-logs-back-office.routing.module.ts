import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EventLogsBackOfficeComponent} from './event-logs-back-office.component';

const routes: Routes = [
  {
    path: '',
    component: EventLogsBackOfficeComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventLogsBackOfficeRoutingModule {
}
