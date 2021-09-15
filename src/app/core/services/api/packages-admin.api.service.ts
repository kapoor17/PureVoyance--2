import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Page} from 'src/app/core/interfaces/page';
import {environment} from 'src/environments/environment';
import {Package} from '../../interfaces/packages/package';
import {ServerResponse} from '../../interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class PackagesAdminApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/admin/packages`;

  constructor(
    private readonly http: HttpClient) {
  }

  public get(): Observable<Page<Package>> {
    return this.http.get<Page<Package>>(this.apiUrl);
  }

  public create(pack: Package): Observable<ServerResponse<Package>> {
    return this.http.post<ServerResponse<Package>>(this.apiUrl, pack);
  }

  public update(id: number, pack: Package): Observable<ServerResponse<Package>> {
    return this.http.put<ServerResponse<Package>>(`${this.apiUrl}/${id}`, pack);
  }

  public updateOrder(data: { id: number, order: number }[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/reorder`, data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
