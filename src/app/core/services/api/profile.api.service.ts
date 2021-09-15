import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from 'src/environments/environment';
import {AppointmentSummary} from '../../interfaces/appointments/appointment-summary';
import {UserComment} from '../../interfaces/comments/user-comment';
import {PatientConsultation} from '../../interfaces/consultations/patient-consultation';
import {InvoiceSummary} from '../../interfaces/invoices/invoice-summary';
import {Page} from '../../interfaces/page';
import {FavoritePsychic} from '../../interfaces/psychic/favorite-psychic';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/profile`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getConsultations(
    page: number,
    pageSize: number): Observable<Page<PatientConsultation>> {
    return this.http.get<Page<PatientConsultation>>(
      `${this.apiUrl}/consultations`,
      {params: this.httpHelper.constructParams({page, per_page: pageSize})});
  }

  public getPsychics(
    page: number,
    pageSize: number): Observable<Page<FavoritePsychic>> {
    return this.http.get<Page<FavoritePsychic>>(
      `${this.apiUrl}/psychics`,
      {params: this.httpHelper.constructParams({page, per_page: pageSize})});
  }

  public getInvoices(
    page: number,
    pageSize: number): Observable<Page<InvoiceSummary>> {
    return this.http.get<Page<InvoiceSummary>>(
      `${this.apiUrl}/invoices`,
      {params: this.httpHelper.constructParams({page, per_page: pageSize})});
  }

  public getAppointments(
    page: number,
    pageSize: number
  ): Observable<Page<AppointmentSummary>> {
    return this.http.get<Page<AppointmentSummary>>(
      `${this.apiUrl}/appointments`,
      {params: this.httpHelper.constructParams({page, per_page: pageSize})});
  }

  public getComments(
    page: number,
    pageSize: number
  ): Observable<Page<UserComment>> {
    return this.http.get<Page<UserComment>>(
      `${this.apiUrl}/comments`,
      {params: this.httpHelper.constructParams({page, per_page: pageSize})});
  }

  public addPsychic(psychicId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/psychics/${psychicId}`, null);
  }

  public removePsychic(psychicId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/psychics/${psychicId}`);
  }
}
