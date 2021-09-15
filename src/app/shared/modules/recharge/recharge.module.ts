// modules
import {NgModule} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../pipes/pipes.module';

import {SharedModule} from '../../shared.module';
import {ConfirmPackageComponent} from './components/confirm-package/confirm-package.component';
import {PaymentDataComponent} from './components/payment-data/payment-data.component';
import {RechargeComponent} from './recharge.component';
import {MaterialsModule} from '../materials.module';
import {NgxMaskModule} from 'ngx-mask';
import {RechargeFinishComponent} from './components/recharge-finish/recharge-finish.component';
import {RechargeErrorComponent} from './components/recharge-error/recharge-error.component';


@NgModule({
  declarations: [
    RechargeComponent,
    ConfirmPackageComponent,
    PaymentDataComponent,
    RechargeFinishComponent,
    RechargeErrorComponent
  ],
  imports: [
    SharedModule,
    PipesModule,
    NgxPaginationModule,
    MaterialsModule,
    NgxMaskModule
  ],
  exports: [
    RechargeComponent
  ]
})
export class RechargeModule {
}
