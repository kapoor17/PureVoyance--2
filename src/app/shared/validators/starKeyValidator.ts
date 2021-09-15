import {AbstractControl, ValidatorFn} from 'ngx-strongly-typed-forms';
import {Package} from '../../core/interfaces/packages/package';

export function starKeysValidator(
  packages: Package[],
  currentPackage: Package): ValidatorFn<string> {
  return (control: AbstractControl<string>) => {
    const existingStarKeys = packages
      .filter(item => item !== currentPackage)
      .map(item => item.star_key);

    return existingStarKeys.includes(control.value?.toString())
      ? {'starKeyCollision': true}
      : null;
  };
}
