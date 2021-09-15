import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {ServerResponse} from 'src/app/core/interfaces/server-response';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {Consultation} from '../../interfaces/consultations/consultation';
import {ConsultationSummary} from '../../interfaces/consultations/consultation-summary';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsAdminApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/consultations`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getPage(
    page: number,
    pageSize: number,
    userId?: number,
    psychicId?: number,
    direction?: 'asc' | 'desc',
    sort?: string,
    search?: string): Observable<Page<ConsultationSummary>> {
    const request = {
      page,
      per_page: pageSize,
      user_id: userId,
      psychic_id: psychicId,
      direction,
      sort,
      search
    };

    return this.http.get<Page<ConsultationSummary>>(
      this.apiUrl,
      {params: this.httpHelper.constructParams(request)});
  }

  public getById(id: number): Observable<ServerResponse<Consultation>> {
    return this.http.get<ServerResponse<Consultation>>(`${this.apiUrl}/${id}`);
  }

  public postComment(id: number, theme: string, text: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/comment/${id}`, {theme, text});
  }
}
