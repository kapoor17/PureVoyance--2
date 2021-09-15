export interface SignUp {
  name: string;
  email: string;
  birthday: string;
  newsletter: boolean;
  phones: [
    {
      id: null;
      phone_code: string;
      phone: string;
      favorite: 0;
    }
  ];
  password: string;
  password_confirmation: string;
}
