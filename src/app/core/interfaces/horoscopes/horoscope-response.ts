import {HoroscopeOverview} from './horoscope-overview';
import {HoroscopeContent} from './horoscope-content';

export interface HoroscopeResponse {
  overviews: HoroscopeOverview[];
  contents: HoroscopeContent[];
}
