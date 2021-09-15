import {BaseSummary} from '../base-summary';

export interface Consultation {
  id: number;
  user: BaseSummary;
  psychic: BaseSummary;
  invoice: {
    id: number;
    number: string;
  };
  start: string;
  end: string;
  duration: string;
  telco_end_status: string;
}