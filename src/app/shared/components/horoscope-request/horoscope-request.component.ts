import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'nsp-horoscope-request',
  templateUrl: './horoscope-request.component.html',
  styleUrls: ['./horoscope-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoroscopeRequestComponent {
}
