import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {ContactUsComponent} from './contact-us.component';


const routes: Routes = [{path: '', component: ContactUsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule {
}
