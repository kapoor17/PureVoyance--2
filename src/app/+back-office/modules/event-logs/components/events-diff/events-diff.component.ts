import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {EventLog} from '../../../../../core/interfaces/events/event-log';

@Component({
  selector: 'nsp-events-diff',
  templateUrl: './events-diff.component.html',
  styleUrls: ['./events-diff.component.scss']
})
export class EventsDiffComponent {
  public oldValue: string;
  public newValue: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { log: EventLog },
    private readonly matDialogRef: MatDialogRef<EventsDiffComponent>) {
    this.oldValue = !!data?.log?.properties?.old
      ? JSON.stringify(data.log.properties.old, null, 2)
      : '';

    this.newValue = !!data?.log?.properties?.new
      ? JSON.stringify(data.log.properties.new, null, 2)
      : '';
  }

  public close(): void {
    this.matDialogRef.close();
  }
}
