import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {PhoneValidateResponseInterface} from '../../../+auth/interfaces/phone-validate-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PhoneValidationApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/validation/phone`;

  constructor(
    private readonly http: HttpClient) {
  }

  public validatePhone(phone: string): Observable<PhoneValidateResponseInterface> {
    return this.http.post<PhoneValidateResponseInterface>(this.apiUrl, {phone});
  }
}
