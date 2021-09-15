import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {PsychicAdmin} from 'src/app/core/interfaces/psychic/psychic-admin';
import {PsychicSummary} from 'src/app/core/interfaces/psychic/psychic-summary';
import {ServerResponse} from 'src/app/core/interfaces/server-response';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PsychicAdminApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/psychics`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getPage(
    page: number,
    pageSize: number,
    direction?: 'asc' | 'desc',
    sort?: string,
    search?: string): Observable<Page<PsychicSummary>> {
    return this.http.get<Page<PsychicSummary>>(
      this.apiUrl,
      {
        params: this.httpHelper.constructParams({
          page,
          per_page:
          pageSize,
          direction,
          sort,
          search
        })
      });
  }

  public getById(id: number): Observable<ServerResponse<PsychicAdmin>> {
    return this.http.get<ServerResponse<PsychicAdmin>>(`${this.apiUrl}/${id}`);
  }

  public update(request, id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }
}
