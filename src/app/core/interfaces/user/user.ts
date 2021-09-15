import {BaseSummary} from '../base-summary';
import {Role} from './role';

export interface User {
  id?: number;
  uid?: number;
  name: string;
  email: string;
  lastname: string;
  birthday: string;
  newsletter: boolean;
  country: BaseSummary;
  zipcode: number;
  city: string;
  number: string;
  birth_place: string;
  birth_hour: string;
  phone_code: string;
  phone: string;
  phones: {
    id: string;
    phone: string;
    phone_code: string;
    favorite: string;
  }[];
  street: string;
  roles: Role[];
  total_credits: number;
  annual_spent: number;
  has_discovery_offer: boolean;
  verified: boolean;
  deleted_at: Date | null;
}
