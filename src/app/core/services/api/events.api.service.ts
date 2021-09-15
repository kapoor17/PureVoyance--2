import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {EventLog} from '../../interfaces/events/event-log';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/activity`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getPage(page: number, pageSize: number): Observable<Page<EventLog>> {
    const request = {
      page,
      per_page: pageSize
    };

    return this.http.get<Page<EventLog>>(
      this.apiUrl,
      {params: this.httpHelper.constructParams(request)});
  }
}