import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseSummary} from '../../interfaces/base-summary';

@Injectable({
  providedIn: 'root'
})
export class GeoApiService {
  private readonly apiUrl = `https://api-market.tlmq.fr/api/data/address`;

  private countriesCache: string[] = [];

  constructor(
    private readonly http: HttpClient) {
  }

  public getCountries(): Observable<string[]> {
    if (!!this.countriesCache.length) {
      return of(this.countriesCache);
    }

    return this.http.get<{ status: boolean, response: { data: string[] } }>(`${this.apiUrl}/country`)
      .pipe(
        map(response => {
          this.countriesCache = response.response.data;

          return response.response.data;
        }));
  }

  public getCities(country: string, name: string): Observable<BaseSummary[]> {
    if (!country || !name) {
      return of([]);
    }

    const params = new HttpParams()
      .append('country', country)
      .append('name', name);

    return this.http.get<{ data: [] }>(`${this.apiUrl}/city/search`, {params})
      .pipe(map(response => response.data.map(item => ({name: item[1], id: item[0]}))));
  }
}
