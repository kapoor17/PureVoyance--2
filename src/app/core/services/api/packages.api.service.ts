import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {environment} from 'src/environments/environment';
import {Package} from '../../interfaces/packages/package';

@Injectable({
  providedIn: 'root'
})
export class PackagesApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/site/packages`;

  constructor(
    private readonly http: HttpClient) {
  }

  public get(): Observable<Page<Package>> {
    return this.http.get<Page<Package>>(this.apiUrl);
  }
}
