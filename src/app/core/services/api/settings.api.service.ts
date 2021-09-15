import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {environment} from 'src/environments/environment';
import {ServerResponse} from '../../interfaces/server-response';
import {DiscoverOfferSettings} from '../../interfaces/settings/discover-offer-settings';
import {CallSettings} from '../../interfaces/settings/call-settings';
import {EmailSettings} from '../../interfaces/settings/email-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/settings`;

  constructor(private readonly http: HttpClient) {
  }

  public getDiscoveryOfferSettings(): Observable<ServerResponse<DiscoverOfferSettings>> {
    if (environment.fakeData) {
      const settings: DiscoverOfferSettings = {
        duration: 10,
        price: 1.99,
        amount: 25,
        credits: 30
      };

      return of({data: settings});
    }

    return this.http.get<ServerResponse<DiscoverOfferSettings>>(`${this.apiUrl}/discovery`);
  }

  public getCallSettings(): Observable<ServerResponse<CallSettings>> {
    if (environment.fakeData) {
      const settings: CallSettings = {
        callTimeToComment: 300,
        clientTelcoNumber: '0186868686',
        maxRetries: 4
      };

      return of({data: settings});
    }

    return this.http.get<ServerResponse<CallSettings>>(`${this.apiUrl}/call`);
  }

  public getEmailSettings(): Observable<ServerResponse<EmailSettings>> {
    if (environment.fakeData) {
      const settings: EmailSettings = {
        contactEmail: 'contact@purevoyance.com',
        fromAddress: 'service@purevoyance.com',
        fromName: 'Purevoyance'
      };

      return of({data: settings});
    }

    return this.http.get<ServerResponse<EmailSettings>>(`${this.apiUrl}/email`);
  }

  public saveDiscoverySettings(settings: DiscoverOfferSettings): Observable<void> {
    if (environment.fakeData) {
      return of(void 0);
    }

    return this.http.post<void>(`${this.apiUrl}/discovery`, settings);
  }

  public saveCallSettings(settings: CallSettings): Observable<void> {
    if (environment.fakeData) {
      return of(void 0);
    }

    return this.http.post<void>(`${this.apiUrl}/call`, settings);
  }

  public saveEmailSettings(settings: EmailSettings): Observable<void> {
    if (environment.fakeData) {
      return of(void 0);
    }

    return this.http.post<void>(`${this.apiUrl}/email`, settings);
  }
}
