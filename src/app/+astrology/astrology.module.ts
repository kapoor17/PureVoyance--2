// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {AstrologyRoutingModule} from './astrology-routing.module';
import {MatCarouselModule} from '@ngmodule/material-carousel';

// components
import {AstrologyComponent} from './astrology.component';
import {CalculateAscendantComponent} from './components/calculate-ascendant/calculate-ascendant.component';
import {AstroCharacterComponent} from './components/astro-character/astro-character.component';
import {LovingBehaviorComponent} from './components/loving-behavior/loving-behavior.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AstrologyComponent,
    CalculateAscendantComponent,
    AstroCharacterComponent,
    LovingBehaviorComponent
  ],
  imports: [
    SharedModule,
    AstrologyRoutingModule,
    MatCarouselModule.forRoot(),
    MatAutocompleteModule
  ]
})
export class AstrologyModule {
}
