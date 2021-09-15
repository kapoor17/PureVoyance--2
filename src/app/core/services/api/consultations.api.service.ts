import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {tap} from 'rxjs/operators';
import Echo from 'laravel-echo';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/telco/start`;

  public status$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private readonly http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  public call(psychic_id: number, number: string): Observable<void> {
    const request = {
      psychic_id,
      number
    };

    return this.http.post<void>(this.apiUrl, request).pipe(
      tap((res: any) => {
        const echo = new Echo({
          authEndpoint: `${environment.apiUrl}/api/broadcasting/auth`,
          auth: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          },
          broadcaster: 'pusher',
          key: 'consultation',
          cluster: 'consultation',
          wsHost: 'socket-purevoyance.dev-prom.pp.ua',
          wsPort: 6001,
          forceTLS: true
        });

        const channel = echo.join(`consultation.${res.data.id}`);
        channel.listen('Consultation', data => {
          this.status$.next(data.data.status);
        });
      })
    );
  }
}
