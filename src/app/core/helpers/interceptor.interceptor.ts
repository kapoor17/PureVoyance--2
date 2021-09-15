import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {EMPTY, Observable} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {AuthService} from '../services/api/auth.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    const expires = localStorage.getItem('expiresIn');

    if (request.url.includes('i18n')) {
      return next.handle(request);
    }

    if (!token) {
      return next.handle(request);
    }

    if (request.url.includes('auth/refresh') || request.url.includes('auth/logout')) {
      return next.handle(this.injectToken(request));
    }

    if (Number(expires) <= (new Date().getTime() / 1000)) {
      return this.authService.refreshToken(token)
        .pipe(
          tap(result => {
            localStorage.setItem('accessToken', result.access_token);
            localStorage.setItem('expiresIn', `${this.getExpiration(result.expires_in)}`);
            this.authService.changeAuthenticatedStatus(true);
          }),
          catchError(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expiresIn');
            this.router.navigate(['']);
            this.authService.changeAuthenticatedStatus(false);

            return EMPTY;
          }),
          switchMap(() => next.handle(this.injectToken(request))));
    }

    return next.handle(this.injectToken(request));
  }

  private injectToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem('accessToken');

    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
  }

  private getExpiration = (expiresIn: number): number => expiresIn + (new Date().getTime() / 1000);
}
