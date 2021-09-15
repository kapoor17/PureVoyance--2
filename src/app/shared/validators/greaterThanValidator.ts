import {AbstractControl, ValidatorFn} from 'ngx-strongly-typed-forms';
import {isNumber} from 'lodash';

export function greaterThanValidator(baseValueAccessor: () => number): ValidatorFn<number> {
  return (control: AbstractControl<number>) => {
    const isValid = isNumber(control.value);
    const baseValue = baseValueAccessor();
    const baseValid = isNumber(baseValue);

    return baseValid && isValid && control.value < baseValue
      ? {'greaterThan': true}
      : null;
  };
}
