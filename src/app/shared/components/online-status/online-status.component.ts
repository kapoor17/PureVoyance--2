import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {PsychicStatus} from 'src/app/core/types/psychic-status.type';

@Component({
  selector: 'nsp-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineStatusComponent {
  @Input() public status: PsychicStatus;
}
