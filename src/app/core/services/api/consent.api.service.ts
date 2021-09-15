import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {ConsentType} from '../../constants/consent-types';
import {Consent} from '../../interfaces/consent/consent';
import {ConsentRequest} from '../../interfaces/consent/consent-request';
import {LinkProperty} from '../../interfaces/consent/link-property';

@Injectable({
  providedIn: 'root'
})
export class ConsentApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/consent`;

  constructor(
    private readonly http: HttpClient) {
  }

  public get(formId: ConsentType): Observable<Consent> {
    return this.http.get<Consent>(`${this.apiUrl}/${formId}`)
      .pipe(map(response => this.substituteProperties(response)));
  }

  public post(request: ConsentRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, request);
  }

  private substituteProperties(consent: Consent): Consent {
    consent.ableToContractText = this.substituteProperty(consent.ableToContractText, consent.linksProperties);
    consent.dataTreatmentText = this.substituteProperty(consent.dataTreatmentText, consent.linksProperties);
    consent.dataTreatmentDetailsText = this.substituteProperty(consent.dataTreatmentDetailsText, consent.linksProperties);
    consent.consents.forEach(consent => {
      consent.displayedText = this.substituteProperty(consent.displayedText, consent.linksProperties);
    });

    return consent;
  }

  private substituteProperty(property: string, linkProperties: LinkProperty[]): string {
    const tags = linkProperties.filter(item => property.includes(`%${item.name}%`));
    tags.forEach(item => property = property.replace(
      `%${item.name}%`,
      `<a href="${item.link}" target="${item.target}">${item.text}</a>`));

    return property;
  }
}