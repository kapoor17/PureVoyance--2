import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsAddCommentsService {
  constructor(private readonly http: HttpClient) {
  }

  public addComment(id, request): Observable<any> {
    const url = `${environment.apiUrl}/api/v2/profile/consultations/${id}/add-comment`;

    return this.http.post<void>(url, request);
  }
}
