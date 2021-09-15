export interface PaymentInfoForm {
  cardOwner: boolean;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: number | null;
  cvvNumber: number | null;
}
