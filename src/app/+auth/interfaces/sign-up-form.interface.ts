import {AddressInfoForm} from './address-info-form.interface';
import {PaymentInfoForm} from './payment-info-form.interface';

export interface SignUpForm {
  // mainInfo: MainInfoForm;
  payments: PaymentInfoForm;
  addressInfo: AddressInfoForm;
}
