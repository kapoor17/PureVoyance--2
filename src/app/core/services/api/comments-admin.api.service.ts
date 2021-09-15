import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {Comment} from '../../interfaces/comments/comment';
import {UpdateComment} from '../../interfaces/comments/update-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsAdminApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/comments`;

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
    search?: string): Observable<Page<Comment>> {
    const request = {
      page,
      per_page: pageSize,
      user_id: userId,
      psychic_id: psychicId,
      direction,
      sort,
      search
    };

    return this.http.get<Page<Comment>>(
      this.apiUrl,
      {params: this.httpHelper.constructParams(request)});
  }

  public update(request: UpdateComment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${request.id}`, request);
  }
}
