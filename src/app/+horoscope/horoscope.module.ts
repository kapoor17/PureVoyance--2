// modules
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {HoroscopeRoutingModule} from './horoscope-routing.module';
import {MatCarouselModule} from '@ngmodule/material-carousel';

// components
import {HoroscopeComponent} from './horoscope.component';
import {HoroscopeListComponent} from './horoscope-list/horoscope-list.component';
import {HoroscopeDetailsComponent} from './horoscope-details/horoscope-details.component';


@NgModule({
  declarations: [
    HoroscopeComponent,
    HoroscopeListComponent,
    HoroscopeDetailsComponent
  ],
  imports: [
    SharedModule,
    HoroscopeRoutingModule,
    MatCarouselModule.forRoot()
  ]
})
export class HoroscopeModule {
}
