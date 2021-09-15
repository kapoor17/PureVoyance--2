import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {ServerResponse} from 'src/app/core/interfaces/server-response';
import {User} from 'src/app/core/interfaces/user/user';
import {UsersPage} from 'src/app/core/interfaces/user/users-page';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {CreateUser} from '../../interfaces/user/create-user';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/users`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getPage(
    page: number,
    pageSize: number,
    direction?: 'asc' | 'desc',
    sort?: string,
    search?: string): Observable<UsersPage> {
    const queryParams = {
      page,
      per_page: pageSize,
      direction,
      sort,
      search
    };

    return this.http.get<UsersPage>(this.apiUrl, {params: this.httpHelper.constructParams(queryParams)});
  }

  public getById(id: number): Observable<ServerResponse<User>> {
    return this.http.get<ServerResponse<User>>(`${this.apiUrl}/${id}`);
  }

  public create(request: CreateUser): Observable<void> {
    return this.http.post<void>(this.apiUrl, request);
  }

  public update(request: CreateUser, id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }
}
