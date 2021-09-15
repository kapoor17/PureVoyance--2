import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {EmailValidateResponseInterface} from '../../../+auth/interfaces/email-validate-response.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/validation/email`;

  constructor(
    private readonly http: HttpClient) {
  }

  public validateEmail(email: string): Observable<EmailValidateResponseInterface> {
    return this.http.post<EmailValidateResponseInterface>(this.apiUrl, {email});
  }
}
