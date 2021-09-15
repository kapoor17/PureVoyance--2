import {Injectable} from '@angular/core';
import {MediumInterface} from '../../shared/interfaces/medium.interface';

@Injectable({
  providedIn: 'root'
})
export class MediumProfileService {
  public favoritePsychics!: MediumInterface[];
  public mediums: MediumInterface[] = [
    {
      id: 1,
      img: 'assets/images/horoscope/laslie-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Leslie',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Free callback',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Tarologue, Medium',
      isLiked: true
    },
    {
      id: 2,
      img: 'assets/images/horoscope/laslie-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Leslie',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Free callback',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Tarologue, Medium',
      isLiked: true

    },
    {
      id: 3,
      img: 'assets/images/horoscope/laslie-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Leslie',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Free callback',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Tarologue, Medium',
      isLiked: false
    },
    {
      id: 4,
      img: 'assets/images/physics/samanta-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Samanta',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Free callback',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Tarologue, Medium',
      isLiked: false
    },
    {
      id: 5,
      img: 'assets/images/physics/samanta-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Samanta',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Free callback',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Tarologue, Medium',
      isLiked: true
    },
    {
      id: 6,
      img: 'assets/images/physics/samanta-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Samanta',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '1.99€/min ',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Alerted By SMS',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Tarologue, Medium',
      isLiked: true
    },
    {
      id: 7,
      img: 'assets/images/physics/samanta-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Samanta',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '1.99€/min ',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Free callback',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Tarologue, Medium',
      isLiked: false
    },
    {
      id: 8,
      img: 'assets/images/horoscope/laslie-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Leslie',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '1.99€/min ',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Free callback',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Tarologue, Medium',
      isLiked: false
    },
    {
      id: 9,
      img: 'assets/images/horoscope/laslie-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Leslie',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '1.99€/min ',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Free callback',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Numerologist, Medium',
      isLiked: true
    },
    {
      id: 10,
      img: 'assets/images/physics/marius-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Marius',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '1.99€/min ',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Alerted By SMS',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Numerologist, Medium',
      isLiked: true
    },
    {
      id: 11,
      img: 'assets/images/physics/marius-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Marius',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '1.99€/min ',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Alerted By SMS',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Numerologist, Medium',
      isLiked: false
    },
    {
      id: 12,
      img: 'assets/images/physics/marius-image.png',
      statusIcon: 'assets/icons/check-icon.svg',
      statusText: 'Disponible',
      name: 'Marius',
      skills: 'How to win back your ex-spouse',
      ratingIcon: 'assets/icons/star-icon.svg',
      priceFirst: '1.99€/min ',
      priceSecond: 'instead of 5.5 € / min *',
      priceThird: 'instead of 5.5 € / min *',
      btn: 'Alerted By SMS',
      btnStyle: 'dark-button',
      specialty: 'Spécialiste de l’amour',
      about: 'Numerologist, Medium',
      isLiked: true
    },
  ];
  public id!: number;

  constructor() {
  }

  public getFavoritePsychics(): MediumInterface[] {
    return this.favoritePsychics = this.mediums.filter(psychic => psychic.isLiked === true);
  }

  public showMedium(i: number): MediumInterface {
    return this.mediums[i];
  }
}
