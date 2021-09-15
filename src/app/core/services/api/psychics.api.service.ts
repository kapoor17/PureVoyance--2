import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {PsychicSummary} from 'src/app/core/interfaces/psychic/psychic-summary';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {Psychic} from '../../interfaces/psychic/psychic';
import {ServerResponse} from '../../interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class PsychicApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/site/psychics`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getPage(
    page: number,
    pageSize: number,
    searchTerm?: string,
    skillId?: number,
    status?: string): Observable<Page<PsychicSummary>> {
    return this.http.get<Page<PsychicSummary>>(
      this.apiUrl,
      {
        params: this.httpHelper.constructParams({
          page,
          per_page:
          pageSize,
          psychic_name: searchTerm,
          skill_id: skillId,
          status
        })
      });
  }

  public getById(id: number): Observable<ServerResponse<Psychic>> {
    return this.http.get<ServerResponse<Psychic>>(`${this.apiUrl}/${id}`);
  }
}
