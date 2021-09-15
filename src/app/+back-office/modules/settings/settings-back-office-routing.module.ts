import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiscoveryOfferSettingsComponent} from './components/discovery-offer-settings/discovery-offer-settings.component';

import {PackagesSettingsComponent} from './components/packages-settings/packages-settings.component';
import {SettingsBackOfficeComponent} from './settings-back-office.component';
import {CallSettingsComponent} from './components/call-settings/call-settings.component';
import {EmailSettingsComponent} from './components/email-settings/email-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsBackOfficeComponent,
    children: [
      {
        path: '',
        redirectTo: 'packages'
      },
      {
        path: 'packages',
        component: PackagesSettingsComponent
      },
      {
        path: 'discovery',
        component: DiscoveryOfferSettingsComponent
      },
      {
        path: 'call-settings',
        component: CallSettingsComponent
      },
      {
        path: 'email-settings',
        component: EmailSettingsComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsBackOfficeRoutingModule {
}
