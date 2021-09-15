import {BaseSummary} from '../base-summary';

export interface Credit {
  id: number;
  user: BaseSummary;
  invoice: {
    id: number;
    number: string;
  };
  type: BaseSummary;
  payment: string;
  amount: number;
  date: Date;
  basic_amount: number;
  bonus_amount: number;
}