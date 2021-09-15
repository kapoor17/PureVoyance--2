import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {max} from 'lodash';

import {Package} from 'src/app/core/interfaces/packages/package';
import {PackagesApiService} from 'src/app/core/services/api/packages.api.service';
import {RechargeService} from '../../modules/recharge/recharge.service';

@UntilDestroy()
@Component({
  selector: 'nsp-select-package',
  templateUrl: './select-package.component.html',
  styleUrls: ['./select-package.component.scss']
})
export class SelectPackageComponent implements OnInit {
  @Output() public handled: EventEmitter<void> = new EventEmitter();
  @Output() public close: EventEmitter<void> = new EventEmitter();

  public page: number = 0;
  public highestBonus: number = 0;

  constructor(
    public readonly rechargeService: RechargeService,
    private readonly packagesApiService: PackagesApiService) {
  }

  public ngOnInit(): void {
    this.packagesApiService.get()
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.rechargeService.setPackages(value.data, value.meta.total);
        this.highestBonus = max(value.data.map(item => (Number(item.credits) + Number(item.extra_credits))
          - (Number(item.amount) + Number(item.extra_amount))));
      });
  }

  public cancel(): void {
    this.close.emit();
  }

  public select(pack: Package): void {
    this.rechargeService.selectPackage(pack);
    this.handled.emit();
  }

  public paginatorEvent(page: number): void {
    this.page = page;
  }
}
