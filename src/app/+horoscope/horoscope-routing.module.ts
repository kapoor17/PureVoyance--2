import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HoroscopeDetailsComponent} from './horoscope-details/horoscope-details.component';
import {HoroscopeListComponent} from './horoscope-list/horoscope-list.component';

// components
import {HoroscopeComponent} from './horoscope.component';


const routes: Routes = [
  {
    path: '',
    component: HoroscopeComponent,
    children: [
      {
        path: '',
        component: HoroscopeListComponent,
      },
      {
        path: ':type',
        component: HoroscopeDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoroscopeRoutingModule {
}
