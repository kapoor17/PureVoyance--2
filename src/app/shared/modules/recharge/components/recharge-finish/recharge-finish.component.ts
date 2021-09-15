import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'nsp-recharge-finish',
  templateUrl: './recharge-finish.component.html',
  styleUrls: ['./recharge-finish.component.scss']
})
export class RechargeFinishComponent {
  @Output() public close: EventEmitter<void> = new EventEmitter();
  @Output() public handled: EventEmitter<void> = new EventEmitter();

  public confirm(): void {
    this.handled.emit();
  }

  public cancel(): void {
    this.close.emit();
  }
}
