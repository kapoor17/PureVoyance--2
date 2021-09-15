import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JoinPipe} from './join.pipe';
import {TimeAgoPipe} from './time-ago.pipe';
import {PricePipe} from './price.pipe';
import {IntegerPartPipe} from './integer-part.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    JoinPipe,
    TimeAgoPipe,
    PricePipe,
    IntegerPartPipe
  ],
  exports: [
    JoinPipe,
    TimeAgoPipe,
    PricePipe,
    IntegerPartPipe
  ]
})
export class PipesModule {
}
