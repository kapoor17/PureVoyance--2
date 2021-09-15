import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {HttpHelper} from 'src/app/core/services/http-helper.service';
import {environment} from '../../../../environments/environment';
import {DailyLoveHoroscope} from '../../interfaces/horoscopes/daily-love-horoscope';
import {HoroscopeResponse} from '../../interfaces/horoscopes/horoscope-response';
import {WeeklyLoveHoroscope} from '../../interfaces/horoscopes/weekly-love-horoscope';

@Injectable({
  providedIn: 'root'
})
export class HoroscopeApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/site/horoscopes`;

  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly http: HttpClient) {
  }

  public get(
    signId: number,
    period: string,
    date: string,
    lang: string): Observable<HoroscopeResponse> {
    const request = {
      sign_id: signId,
      date,
      time_span: period,
      lang
    };

    return this.http.get<HoroscopeResponse>(
      this.apiUrl,
      {params: this.httpHelper.constructParams(request)});
  }

  public getDailyLove(
    sign: string,
    gender: string): Observable<DailyLoveHoroscope> {
    if (environment.fakeData) {
      return of({
        text: 'Il n\'y a qu\'une sorte d\'amour, mais il y en a mille différentes copies (La Rochefoucauld).',
        quotes: 'Pour les natifs solitaires, cette journée sera la promesse de rencontres sentimentales agréables, placées sous le signe de l\'imprévu et de l\'insolite. Mais les amours qui débuteront ce jour seront mouvementées, et il faudra beaucoup de patience et de persévérance pour les mener jusqu\'au mariage. Vivant en couple, vous pourriez vous sentir rejeté ou mal aimé de votre conjoint ou partenaire. Et alors vous vous replierez sur vous-même, ce qui pourra se traduire par des douleurs cervicales et des migraines.'
      });
    }

    const request = {
      sign,
      gender
    };

    return this.http.get<DailyLoveHoroscope>(
      `${this.apiUrl}/daily`,
      {params: this.httpHelper.constructParams(request)});
  }

  public getWeeklyLove(
    sign: string,
    gender: string): Observable<WeeklyLoveHoroscope> {
    if (environment.fakeData) {
      return of({
        couples: 'Les rayonnements de Vénus assureront aux couples une activité amoureuse tout à fait satisfaisante, libérée de toute inhibition. Vous atteindrez sans difficulté l\'extase.',
        quotes: 'Rage d\'amour est pire que le mal de dents (proverbe français).',
        single: 'Vous devriez rencontrer l\'âme soeur chez des amis communs cette semaine. Vous aurez envie de plaire et mettrez le paquet pour cela. Par ailleurs, la personne que vous avez vainement tenté de prendre dans vos filets pourrait bien finir entre vos bras !',
        text: 'Semaine du Lundi 27 Décembre 2010 au Dimanche 2 Janvier 2011'
      });
    }

    const request = {
      sign,
      gender
    };

    return this.http.get<WeeklyLoveHoroscope>(
      `${this.apiUrl}/weekly`,
      {params: this.httpHelper.constructParams(request)});
  }

  public getSeventhHeaven(
    sign: string,
    gender: string): Observable<string> {
    if (environment.fakeData) {
      return of('Votre partenaire doit être toujours prête à vous accueillir dans ses bras, car si votre désir n\'est pas satisfait sur-le-champ, il pourrait très bien s\'évaporer. Vous auriez un plaisir extrême à savoir, au moment où vous êtes pris par vos pulsions, que l\'autre n\'a absolument aucun autre vêtement sous sa robe ou sa jupe. Elle doit aussi savoir que vous pourriez très bien vous emparer d\'elle lorsqu\'elle est en train de cuisiner, de regarder la télé, ou sur le point d\'aller faire des courses. Elle ne doit jamais vous faire des reproches du genre "Tu m\'as décoiffée !" ou "Ma robe est toute froissée !"\nElle doit accepter de bon coeur vos manières un peu bourrues de lui faire l\'amour, en pensant que c\'est bien là votre façon naturelle d\'exprimer votre sexualité. Comme tout autre homme, vous adorez qu\'elle vous caresse le sexe ; mais que ses caresses soient légères et subtiles, surtout sur le gland et le frein, afin d\'éviter de déclencher malencontreusement votre orgasme.\nIl n\'est pas rare que votre sexe ne suit pas votre désir. Dans ces cas, votre partenaire doit adopter une attitude qui ne soit ni réprobatrice ni condescendante. Qu\'elle vous dise simplement qu\'elle aimerait mieux, sur le moment, être caressée de la tête aux pieds qu\'être pénétrée. Cela vous permettra de préserver votre confiance en vous-même.');
    }

    const request = {
      sign,
      gender
    };

    return this.http.get<string>(
      `${this.apiUrl}/seventh-heaven`,
      {params: this.httpHelper.constructParams(request)});
  }
}
