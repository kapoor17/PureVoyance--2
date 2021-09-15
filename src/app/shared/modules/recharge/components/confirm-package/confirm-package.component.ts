import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {RechargeService} from '../../recharge.service';

@Component({
  selector: 'nsp-confirm-package',
  templateUrl: './confirm-package.component.html',
  styleUrls: ['./confirm-package.component.scss']
})
export class ConfirmPackageComponent implements OnInit {
  @Output() public handled: EventEmitter<void> = new EventEmitter();
  @Output() public close: EventEmitter<void> = new EventEmitter();
  @Output() public goBack: EventEmitter<void> = new EventEmitter();

  @Input() public isDiscovery: boolean;

  public excludingVat: number;
  public extraCredits: number;
  public total: number;

  constructor(public readonly rechargeService: RechargeService) {
  }

  public ngOnInit(): void {
    if (!this.rechargeService.selectedPackage) {
      return;
    }

    const pack = this.rechargeService.selectedPackage;
    this.total = +pack.amount + +pack.extra_amount;
    this.excludingVat = ((+pack.amount + +pack.extra_amount) / 100) * 80;
    this.extraCredits = (+pack.credits + +pack.extra_credits) - (+pack.amount + +pack.extra_amount);
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
