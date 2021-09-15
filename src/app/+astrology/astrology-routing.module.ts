import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AstrologyTestLinksComponent} from '../shared/components/astrology-test-links/astrology-test-links.component';

// components
import {AstrologyComponent} from './astrology.component';
import {AstroCharacterComponent} from './components/astro-character/astro-character.component';
import {CalculateAscendantComponent} from './components/calculate-ascendant/calculate-ascendant.component';
import {LovingBehaviorComponent} from './components/loving-behavior/loving-behavior.component';


const routes: Routes = [
  {
    path: '',
    component: AstrologyComponent,
    children: [
      {
        path: '',
        component: AstrologyTestLinksComponent
      },
      {
        path: 'calculate-ascendant',
        component: CalculateAscendantComponent
      },
      {
        path: 'astro-character',
        component: AstroCharacterComponent
      },
      {
        path: 'loving-behavior',
        component: LovingBehaviorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstrologyRoutingModule {
}
