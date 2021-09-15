import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';

import {SignIn} from '../../../shared/interfaces/sign-in.interface';
import {environment} from 'src/environments/environment';
import {LoginResponse} from 'src/app/core/interfaces/auth/login-response.interface';
import {ForgotPassword} from 'src/app/core/interfaces/auth/forgot-password.interface';
import {SignUp} from 'src/app/core/interfaces/auth/sign-up.interface';
import {UserResponse} from 'src/app/core/interfaces/user/user-response';
import {UpdateUserRequest} from 'src/app/core/interfaces/user/update-user-request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2`;

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router) {
  }

  public signIn(signInData: SignIn): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, signInData);
  }

  public getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/auth/user`);
  }

  public updateUser(data: UpdateUserRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/profile/user`, data);
  }

  public signUp(signUpData: SignUp): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/signup`, signUpData);
  }

  public refreshToken(token: string): Observable<LoginResponse> {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${token}`);

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/refresh`, null, {headers});
  }

  public logOut(): Observable<void> {
    this.router.navigate(['/']);

    return this.http.post<void>(`${this.apiUrl}/auth/logout`, null);
  }

  public get isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');

    return token !== null && token !== undefined;
  }

  public forgotPassword(request: ForgotPassword): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/auth/forgot`, request);
  }

  public resetPassword(resetPasData: object): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/auth/reset`, resetPasData);
  }

  public changeAuthenticatedStatus(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }

  public getRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/roles/get`);
  }
}
