import {Injectable} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const key = 'consultation';
const wsPost = 6001;
const url = 'https://back-purevoyance.dev-prom.pp.ua/api/broadcasting/auth';
export const WS_ENDPOINT = `ws://socket-back-purevoyance.dev-prom.pp.ua:${wsPost}/app/${key}`;
export const subject = webSocket(WS_ENDPOINT);

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private readonly http: HttpClient) {
  }

  public open(response: any): Observable<any> {
    const www = new FormData();
    www.append('socket_id', response.socket_id);
    www.append('channel_name', response.channel_name);

    return this.http.post(url, www).pipe(tap(res => res));
  }
}
