import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {ConfirmationDialogDataInterface} from './confirmation-dialog-data';

@Component({
  selector: 'nsp-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  constructor(
    public readonly matDialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogDataInterface) {
  }

  public cancel(): void {
    this.matDialogRef.close();
  }

  public submit(): void {
    this.matDialogRef.close(true);
  }
}
