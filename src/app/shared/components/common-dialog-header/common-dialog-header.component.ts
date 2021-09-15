import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'nsp-common-dialog-header',
  templateUrl: './common-dialog-header.component.html',
  styleUrls: ['./common-dialog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDialogHeaderComponent {
  @Input() public isHidden: boolean;
  @Input() public title: string;
  @Output() public cancel: EventEmitter<void> = new EventEmitter();

  public onCancel(): void {
    this.cancel.emit();
  }
}
