// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {EventLogsBackOfficeRoutingModule} from './event-logs-back-office.routing.module';

// components
import {EventLogsBackOfficeComponent} from './event-logs-back-office.component';
import {EventsDiffComponent} from './components/events-diff/events-diff.component';
import {NgxTextDiffModule} from 'ngx-text-diff';


@NgModule({
  declarations: [
    EventLogsBackOfficeComponent,
    EventsDiffComponent
  ],
  imports: [
    SharedModule,
    EventLogsBackOfficeRoutingModule,
    NgxTextDiffModule
  ]
})
export class EventLogsBackOfficeModule {
}
