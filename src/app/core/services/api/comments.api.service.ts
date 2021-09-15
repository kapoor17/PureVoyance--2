import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {Comment} from '../../interfaces/comments/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/site/comments`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getPage(limit?: number): Observable<Page<Comment>> {
    return this.http.get<Page<Comment>>(
      this.apiUrl,
      {params: this.httpHelper.constructParams({limit})});
  }
}
