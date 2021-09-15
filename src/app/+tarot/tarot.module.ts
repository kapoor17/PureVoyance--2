// modules
import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {TarotCardsComponent} from './components/tarot-cards/tarot-cards.component';
import {TarotLinksComponent} from './components/tarot-links/tarot-links.component';
import {TarotRoutingModule} from './tarot-routing.module';
import {TarotComponent} from './tarot.component';


@NgModule({
  declarations: [
    TarotComponent,
    TarotLinksComponent,
    TarotCardsComponent
  ],
  imports: [
    SharedModule,
    TarotRoutingModule
  ]
})
export class TarotModule {
}
