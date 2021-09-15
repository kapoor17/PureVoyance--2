import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {InvoiceSummary} from '../../interfaces/invoices/invoice-summary';

@Injectable({
  providedIn: 'root'
})
export class InvoicesApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/invoices`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getPage(
    page: number,
    pageSize: number,
    userId?: number,
    userName?: string,
    direction?: 'asc' | 'desc',
    sort?: string,
    search?: string): Observable<Page<InvoiceSummary>> {
    const request = {
      page,
      per_page: pageSize,
      user_id: userId,
      user_name: userName,
      direction,
      sort,
      search
    };

    return this.http.get<Page<InvoiceSummary>>(
      this.apiUrl,
      {params: this.httpHelper.constructParams(request)});
  }
}