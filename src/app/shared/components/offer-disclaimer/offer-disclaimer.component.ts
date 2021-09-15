import {Component, OnInit} from '@angular/core';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {DiscoverOfferSettings} from 'src/app/core/interfaces/settings/discover-offer-settings';
import {SettingsApiService} from 'src/app/core/services/api/settings.api.service';

@UntilDestroy()
@Component({
  selector: 'nsp-offer-disclaimer',
  templateUrl: './offer-disclaimer.component.html',
  styleUrls: ['./offer-disclaimer.component.scss']
})
export class OfferDisclaimerComponent implements OnInit {
  public discoverSettings: DiscoverOfferSettings;

  constructor(public readonly settingsApiService: SettingsApiService) {
  }

  public ngOnInit(): void {
    this.settingsApiService.getDiscoveryOfferSettings()
      .pipe(untilDestroyed(this))
      .subscribe(value => this.discoverSettings = value.data);
  }
}
