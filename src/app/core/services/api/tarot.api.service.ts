import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {DailyLoveHoroscope} from '../../interfaces/horoscopes/daily-love-horoscope';

@Injectable({
  providedIn: 'root'
})
export class TarotApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/v2/site/tarot`;

  constructor(private readonly http: HttpClient) {
  }

  public getLove(): Observable<DailyLoveHoroscope[]> {
    if (environment.fakeData) {
      return of([{
        text: 'Sortez de votre isolement affectif. Vous qui souhaitez vivement une chaleureuse relation amoureuse, faites les premiers pas. Ne soyez pas craintif : vous serez bien accueilli et vous connaîtrez de bien douces joies. L\'essentiel sera d\'avoir le courage de briser la glace ; la bonne planète Vénus s\'occupera du reste.',
        quotes: 'Un amour peut être guéri par un autre amour, comme un poison est souvent chassé par un autre poison (J. Dryden).'
      }, {
        text: 'Une aura particulièrement romantique entourera votre vie ce jour. Vous pourrez vous en réjouir et vous sentir plein de jeunesse et d\'audace. Mais attention ! Mettez un frein quand vous sentirez que l\'atmosphère se charge d\'une excitation par trop débordante. Vous éviterez ainsi quelques folies regrettables.',
        quotes: 'On pardonne tant que l\'on aime (La Rochefoucauld).'
      },
        {
          text: 'Une séduisante personne que vous jugez inoffensive pourrait bien vous faire le coup de l\'amour romantique. Résultat : vous vous retrouverez pieds et poings liés en son pouvoir. Mais après tout, ce ne sera pas si terrible que cela ! Et vous vous en féliciterez même !',
          quotes: 'Un simple frôlement de manches fait naître l\'amour (proverbe japonais).'
        },
        {
          text: 'Faites attention pour ne pas rater le coche. Vous pourriez passer à côté de quelqu\'un d\'important pour vous sur le plan sentimental et ne pas vous en apercevoir. Soyez prêt à réagir promptement et de façon avantageuse. Les moments de doute disparaîtront quand vous vous rendrez compte que l\'amour peut vous rendre follement heureux.',
          quotes: 'Qui t\'aime te fait pleurer ; qui te hait te fait rire (proverbe espagnol).'
        },
        {
          text: 'Cette journée présente un bel aspect planétaire qui favorisera tout autant les sentiments passionnés, intenses, vibrants qu\'imprégnés de romanesque et de douceur tendre. Un belle journée, donc, pour engager durablement sa foi envers un être cher, pour se fiancer, se marier dans une ambiance heureuse. Habituellement peu démonstratif, vous trouverez pourtant aisément les mots tendres qui convaincront.',
          quotes: 'Quand l\'amour se déchire, on ne peut pas en recoudre les bords (proverbe malgache).'
        },
        {
          text: 'Sous l\'action de la planète Vénus, il est possible qu\'une relation amoureuse devienne ce jour une relation amicale. C\'est beaucoup moins excitant mais c\'est parfaitement normal puisque "l\'amitié est plus souvent une porte de sortie qu\'une porte d\'entrée de l\'amour" (Gustave Le Bon). Il n\'empêche que cette relation amicale pourra vous être utile à plusieurs égards',
          quotes: 'Un nouvel amour en remplace un ancien comme un clou chasse l\'autre (Cicéron).'
        },
        {
          text: 'Il pourra y avoir un passage orageux pour votre couple, chacun des partenaires tenant à ses idées et estimant que l\'autre doit partager les mêmes goûts, adopter les mêmes tendances. Il est bien évident qu\'entre un homme qui n\'admet pas la contradiction et une femme qui veut faire régner sur son foyer sa calme autorité, des conflits doivent naître. La seule solution possible sera la tolérance mutuelle.',
          quotes: 'L\'amour et l\'amitié s\'excluent l\'un l\'autre (La Bruyère).'
        }]);
    }

    return this.http.get<DailyLoveHoroscope[]>(`${this.apiUrl}/love`);
  }

  public getMarseille(): Observable<string[]> {
    if (environment.fakeData) {
      return of([
        'Dans votre vie affective, vous saurez prendre des initiatives et mettre fin à certaines situations qui ne pouvaient plus durer.',
        'Une série de circonstances défavorables pourrait provoquer des soucis d\'argent imprévus. Mais, vous saurez faire face avec courage à cette adversité, laquelle, d\'ailleurs, ne se révélera nullement catastrophique. Désormais, tâchez toujours de mettre un peu d\'argent de côté en prévision d\'un coup dur toujours possible.',
        'Il faudra vous mettre sérieusement à entretenir votre santé malgré vos multiples autres préoccupations, en vous persuadant que "la santé, c\'est l\'unité qui fait valoir tous les zéros de la vie" (Fontenelle). Évitez les excès de toute nature, notamment de l\'alcool et du tabac. Ayez un sommeil profond et suffisant. Les yeux seront fragiles ; protégez-les de la lumière trop vive.',
        'Vous serez impatient de voir se réaliser vos projets, et vous supporterez très mal les retards ou les contretemps. Pourtant, il faudra bien vous adapter aux circonstances. Ne craignez rien ; vous parviendrez à vos fins.',
        'L\'entente avec les enfants sera excellente, car vous serez à l\'écoute de leurs petits problèmes et vous vous montrerez compréhensif. Certaines démarches que vous effectuerez pour eux seront primordiales pour leur avenir. Le moment sera favorable pour faire jouer vos relations, ou tout au moins pour donner le petit coup de pouce qui peut changer ou améliorer bien des choses.',
        'Vous aimez recevoir des amis, vous avez le désir de vous sentir entouré, et le contact avec les autres est un besoin que vous ressentez profondément. Mais il ne faut pas transformer votre maison en hall de transit où chacun entre et sort à sa guise. Efforcez-vous de faire un choix dans vos relations et éliminez impitoyablement celles qui vous paraissent trop envahissantes ou intéressées.'
      ]);
    }

    return this.http.get<string[]>(`${this.apiUrl}/marseille`);
  }

  public getLabor(): Observable<string[]> {
    if (environment.fakeData) {
      return of([
        'Dans votre vie affective, vous saurez prendre des initiatives et mettre fin à certaines situations qui ne pouvaient plus durer.',
        'Si vous ressentez le besoin irrépressible de dire à vos supérieurs ou à vos collègues de travail ce que vous pensez, assurez-vous au préalable que c\'est bien ce qu\'ils ont envie d\'entendre. Sinon, "dites-le dans une cruche et refermez-la hermétiquement" (proverbe vietnamien).',
        'Dans le domaine professionnel, vous pourrez compter sur des résultats très encourageants et sur une évolution favorable de vos entreprises, avec des voyages répétés et soudains. Profitez-en pour vous mettre avec ardeur à la pratique d\'une langue étrangère. Vous élargirez votre champ d\'action avec la possibilité d\'un recyclage intéressant.',
        'Côté profession, ne vous endormez pas sur vos lauriers. Consolidez votre situation par tous les moyens, même si vous estimez ne pas avoir à vous faire de soucis à ce sujet. Le moment sera bien choisi pour organiser, structurer, gérer, administrer, économiser et prospérer. Si vous avez un poste de responsabilité, orientez-vous plutôt vers la fonction d\'éminence grise que vers les décisions fracassantes. En d\'autres termes, votre action la plus efficace consisterait à inspirer plutôt qu\'à décider.',
        'Vous ne manquerez ni d\'élan ni d\'optimisme. Ce sera le moment de vous atteler à un projet professionnel qui demande du punch et du culot. Mais il vous faudra impérativement parvenir à dominer votre agressivité, sinon la situation deviendra critique en milieu de la journée. Surtout, évitez de prendre une décision irrévocable sur un coup de tête. Laissez la nuit vous porter conseil.',
        'Au travail, on vous mènera la vie si dure que vous pourriez envisager de donner votre démission. Tâchez de tenir bon quelques jours, en attendant une amélioration de la situation qui ne devrait pas tarder. Votre moral risque d\'être au plus bas, mais vous reprendrez vite le dessus si vous décidez de ne pas lâcher prise.',
        'Des changements importants pourraient survenir lors d\'une réunion de travail. Ils ont toutes les chances d\'être bénéfiques pour votre carrière. Faites le nécessaire pour vous laisser porter avantageusement par la vague.'
      ]);
    }

    return this.http.get<string[]>(`${this.apiUrl}/labor`);
  }
}
