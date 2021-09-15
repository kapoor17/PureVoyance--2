import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsApiService} from 'src/app/core/services/api/settings.api.service';

import {HoroscopeService} from 'src/app/core/services/horoscope.service';
import {HoroscopeInterface} from 'src/app/shared/interfaces/horoscope.interface';

@Component({
  selector: 'nsp-horoscope-list',
  templateUrl: './horoscope-list.component.html',
  styleUrls: ['./horoscope-list.component.scss']
})
export class HoroscopeListComponent {
  public today = new Date();

  constructor(
    private readonly router: Router,
    public readonly settingsApiService: SettingsApiService,
    public readonly horoscopeService: HoroscopeService) {
  }

  public onHoroscopeClick(item: HoroscopeInterface): void {
    this.router.navigate([`./horoscope`, item.value]);
  }
}
