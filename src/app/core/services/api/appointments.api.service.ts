import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {ServerResponse} from 'src/app/core/interfaces/server-response';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {Appointment} from '../../interfaces/appointments/appointment';
import {AppointmentSummary} from '../../interfaces/appointments/appointment-summary';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/appointments`;

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
    search?: string): Observable<Page<AppointmentSummary>> {
    const request = {
      page,
      per_page: pageSize,
      user_id: userId,
      psychic_id: psychicId,
      direction,
      sort,
      search
    };

    return this.http.get<Page<AppointmentSummary>>(
      this.apiUrl,
      {params: this.httpHelper.constructParams(request)});
  }

  public getById(id: number): Observable<ServerResponse<Appointment>> {
    return this.http.get<ServerResponse<Appointment>>(`${this.apiUrl}/${id}`);
  }
}