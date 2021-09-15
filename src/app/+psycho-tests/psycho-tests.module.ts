// modules
import {NgModule} from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';

import {SharedModule} from 'src/app/shared/shared.module';
import {PsychoTestComponent} from './components/psycho-test/psycho-test.component';
import {PsychoTestsLinksComponent} from './components/psycho-tests-links/psycho-tests-links.component';
import {PsychoTestsRoutingModule} from './psycho-tests-routing.module';

// components
import {PsychoTestsComponent} from './psycho-tests.component';


@NgModule({
  declarations: [
    PsychoTestsComponent,
    PsychoTestsLinksComponent,
    PsychoTestComponent
  ],
  imports: [
    SharedModule,
    PsychoTestsRoutingModule,
    NgxPaginationModule
  ]
})
export class PsychoTestsModule {
}
