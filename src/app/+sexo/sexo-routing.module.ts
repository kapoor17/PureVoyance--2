import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SexoFormComponent} from './components/sexo-form/sexo-form.component';
import {SexoLinksComponent} from './components/sexo-links/sexo-links.component';

// components
import {SexoComponent} from './sexo.component';


const routes: Routes = [
  {
    path: '',
    component: SexoComponent,
    children: [
      {
        path: '',
        component: SexoLinksComponent
      },
      {
        path: 'daily',
        component: SexoFormComponent
      },
      {
        path: 'weekly',
        component: SexoFormComponent
      },
      {
        path: 'seventh-heaven',
        component: SexoFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SexoRoutingModule {
}
