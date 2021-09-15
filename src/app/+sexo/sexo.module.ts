// modules
import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {SexoFormComponent} from './components/sexo-form/sexo-form.component';
import {SexoLinksComponent} from './components/sexo-links/sexo-links.component';
import {SexoRoutingModule} from './sexo-routing.module';
import {SexoComponent} from './sexo.component';


@NgModule({
  declarations: [
    SexoComponent,
    SexoLinksComponent,
    SexoFormComponent
  ],
  imports: [
    SharedModule,
    SexoRoutingModule
  ]
})
export class SexoModule {
}
