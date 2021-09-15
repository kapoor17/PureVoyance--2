import {HoroscopeContentSection} from './horoscope-content-section';

export interface HoroscopeContent {
  id: string;
  title: string;
  text: string;
  sections: HoroscopeContentSection[];
  iconUrl: string;
  titleColor: string;
  textColor: string;

  rating?: number;
}
