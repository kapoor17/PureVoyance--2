import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {HoroscopeInterface} from 'src/app/shared/interfaces/horoscope.interface';
import {environment} from 'src/environments/environment';
import {HoroscopeService} from '../horoscope.service';

@Injectable({
  providedIn: 'root'
})
export class AstrologyApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/site/astrology`;

  constructor(
    private readonly horoscopeService: HoroscopeService,
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public getAscendantSign(
    day: number,
    month: number,
    year: number,
    hour: number | null,
    minute: number | null,
    cityId: number): Observable<HoroscopeInterface> {
    const request = {
      day_birth: day,
      month_birth: month,
      year_birth: year,
      hour_birth: hour,
      min_birth: minute,
      city_birth_id: cityId
    };

    return this.http.get(`${this.apiUrl}/ascending-calculate`, {
      params: this.httpHelper.constructParams(request),
      responseType: 'text'
    })
      .pipe(map((item: any) => this.horoscopeService.horoscopes.find(sign => sign.frenchId === item))
      );
  }

  public getAscendant(sign: string, ascendantSign: string): Observable<string> {
    const request = {
      sign,
      ascendant_sign: ascendantSign
    };

    return this.http.get(`${this.apiUrl}/ascending`, {
      params: this.httpHelper.constructParams(request),
      responseType: 'text'
    });
  }

  public getCharacter(sign: string, gender: string): Observable<string[]> {
    const request = {
      sign,
      gender
    };

    return this.http.get<string[]>(
      `${this.apiUrl}/character`,
      {params: this.httpHelper.constructParams(request)});
  }

  public getAffinities(manSign: string, womanSign: string): Observable<string[]> {
    const request = {
      man_sign: manSign,
      woman_sign: womanSign
    };

    return this.http.get<string[]>(
      `${this.apiUrl}/affinities`,
      {params: this.httpHelper.constructParams(request)});
  }
}
