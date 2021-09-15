export interface PhoneValidateResponseInterface {
  invalidReasons: [string];
  valid: boolean;
  validatedPhoneNumber: {
    country: string;
    countryCallingCode: string;
    internationalNumber: string;
    nationalNumber: string;
    type: null;
  };
}
