import {BaseSummary} from '../base-summary';

export interface InvoiceSummary {
  date: string;
  duration: string;
  cost: number;
  psychic: BaseSummary;
  customer: BaseSummary;
}