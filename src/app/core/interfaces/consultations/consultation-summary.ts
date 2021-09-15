import {BaseSummary} from '../base-summary';

export interface ConsultationSummary {
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
  price: number;
  media: string;
  telco_end_status: string;
}
