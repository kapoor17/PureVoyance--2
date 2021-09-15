import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'nsp-recharge-error',
  templateUrl: './recharge-error.component.html',
  styleUrls: ['./recharge-error.component.scss']
})
export class RechargeErrorComponent {
  @Output() public close: EventEmitter<void> = new EventEmitter();
  @Output() public handled: EventEmitter<void> = new EventEmitter();

  public confirm(): void {
    this.handled.emit();
  }

  public cancel(): void {
    this.close.emit();
  }
}
