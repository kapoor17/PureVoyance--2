export interface UpdateUserRequest {
  name: string;
  email: string;
  phone_code: string | number;
  number: string;
  lastname: string;
  birthday: Date | string;
  newsletter: boolean;
  country_id: number;
  zipcode: number | null;
  city: string;
  birth_place: string;
  phone: string;
  street: string;
}
