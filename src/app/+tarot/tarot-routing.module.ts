import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TarotCardsComponent} from './components/tarot-cards/tarot-cards.component';
import {TarotLinksComponent} from './components/tarot-links/tarot-links.component';
import {TarotComponent} from './tarot.component';


const routes: Routes = [
  {
    path: '',
    component: TarotComponent,
    children: [
      {
        path: '',
        component: TarotLinksComponent
      },
      {
        path: ':type',
        component: TarotCardsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarotRoutingModule {
}
