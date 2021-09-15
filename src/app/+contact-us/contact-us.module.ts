// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {ContactUsRoutingModule} from './contact-us-routing.module';

// components
import {ContactUsComponent} from './contact-us.component';


@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    SharedModule,
    ContactUsRoutingModule
  ]
})
export class ContactUsModule {
}
