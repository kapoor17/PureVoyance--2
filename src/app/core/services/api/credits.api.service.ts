import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {Credit} from '../../interfaces/credits/credit';

@Injectable({
  providedIn: 'root'
})
export class CreditsApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/credits`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getPage(
    page: number,
    pageSize: number,
    userId?: number,
    typeId?: number,
    direction?: 'asc' | 'desc',
    sort?: string,
    search?: string): Observable<Page<Credit>> {
    const request = {
      page,
      per_page: pageSize,
      user_id: userId,
      type_id: typeId,
      direction,
      sort,
      search
    };

    return this.http.get<Page<Credit>>(
      this.apiUrl,
      {params: this.httpHelper.constructParams(request)});
  }
}