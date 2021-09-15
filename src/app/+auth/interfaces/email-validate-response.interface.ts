export interface EmailValidateResponseInterface {
  account: string;
  domain: string;
  email: string;
  force: boolean;
  invalidationReason: string;
  lastVerificationDate: string;
  valid: boolean;
  validationStatus: string;
}
