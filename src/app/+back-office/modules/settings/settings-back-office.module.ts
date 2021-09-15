// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {DiscoveryOfferSettingsComponent} from './components/discovery-offer-settings/discovery-offer-settings.component';
import {EditPackageComponent} from './components/edit-package/edit-package.component';
import {PackagesSettingsComponent} from './components/packages-settings/packages-settings.component';
import {SettingsBackOfficeRoutingModule} from './settings-back-office-routing.module';

// components
import {SettingsBackOfficeComponent} from './settings-back-office.component';
import {CallSettingsComponent} from './components/call-settings/call-settings.component';
import {EmailSettingsComponent} from './components/email-settings/email-settings.component';


@NgModule({
  declarations: [
    SettingsBackOfficeComponent,
    PackagesSettingsComponent,
    EditPackageComponent,
    DiscoveryOfferSettingsComponent,
    CallSettingsComponent,
    EmailSettingsComponent
  ],
  imports: [
    SharedModule,
    SettingsBackOfficeRoutingModule
  ]
})
export class SettingsBackOfficeModule {
}
