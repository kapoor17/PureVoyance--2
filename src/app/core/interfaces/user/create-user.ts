import {Role} from './role';

export interface CreateUser {
  roles: Role[] | Array<any>;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_code: string;
  number: string | number;
  lastname: string;
  birthday: string | Date;
  birth_hour: string;
  newsletter?: boolean;
  country_id: number;
  zipcode: number;
  city: string;
  birth_place: string;
  phone: string;
  street: string;
  phonesArray: {
    phone: string;
    phone_code: string;
  };
}
