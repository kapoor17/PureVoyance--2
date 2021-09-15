import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Package} from 'src/app/core/interfaces/packages/package';

import {RechargeService} from '../../recharge.service';
import {UntilDestroy} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'nsp-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.scss']
})
export class PaymentDataComponent implements OnInit {
  @Output() public handled: EventEmitter<void> = new EventEmitter();
  @Output() public close: EventEmitter<void> = new EventEmitter();
  @Output() public goBack: EventEmitter<void> = new EventEmitter();

  @Input() public isDiscovery: boolean;

  public paymentIframeSrc: string;

  constructor(
    public readonly rechargeService: RechargeService) {
  }

  public ngOnInit(): void {
    if (!this.rechargeService.selectedPackage) {
      return;
    }

    const amount = Number(this.pack.amount) + Number(this.pack.extra_amount);
    this.paymentIframeSrc = `https://paiement.telemaque.fr/tmp/redirect-v1.php?url_ipn=https://api.purevoyance.fr/ipn/61123ed1c974b10006e3a269&psp=checkout&type=hosted-fields&payment_action=debit&opener=0&iframe=1&ajax=1&amount=${amount}&origin=https://old.purevoyance.com&sandbox=0&client=purevoyance&customer=6061d98ecc13be0006c761f7&company=cosmospace&media=6`;
  }

  public get pack(): Package {
    return this.rechargeService.selectedPackage;
  }

  public cancel(): void {
    this.close.emit();
  }

  public confirm(): void {
    this.handled.emit();
  }

  public stepBack(): void {
    this.goBack.emit();
  }
}
