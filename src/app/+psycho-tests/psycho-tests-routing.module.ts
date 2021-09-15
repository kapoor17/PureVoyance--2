import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PsychoTestComponent} from './components/psycho-test/psycho-test.component';
import {PsychoTestsLinksComponent} from './components/psycho-tests-links/psycho-tests-links.component';
import {PsychoTestsComponent} from './psycho-tests.component';


const routes: Routes = [
  {
    path: '',
    component: PsychoTestsComponent,
    children: [
      {
        path: '',
        component: PsychoTestsLinksComponent
      },
      {
        path: ':type',
        component: PsychoTestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychoTestsRoutingModule {
}
