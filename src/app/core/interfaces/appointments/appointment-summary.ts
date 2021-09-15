import {BaseSummary} from '../base-summary';

export interface AppointmentSummary {
  id: number;
  psychic: BaseSummary;
  start: string;
  end: string;
  media: string;
}