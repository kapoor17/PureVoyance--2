import {Role} from './role';

export interface UserSummary {
  id: number;
  name: string;
  email: string;
  lastname: string;
  birthday: string;
  newsletter: boolean;
  country: {
    id: number;
    name: string;
  };
  zipcode: number;
  city: string;
  number: string;
  birth_place: string;
  phone_code: string;
  phone: string;
  street: string;
  roles: Role[];
  total_credits: number;
  has_discovery_offer: boolean;
  verified: boolean;

  roleNames: string[];
}