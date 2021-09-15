import {BaseSummary} from '../base-summary';

export interface Appointment {
  id: number;
  user: BaseSummary;
  psychic: BaseSummary;
  start: string;
  end: string;
  media: string;
}
