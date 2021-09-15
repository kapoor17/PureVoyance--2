import {CountryOption} from 'src/app/+auth/interfaces/country-option.interface';

export const countryOptions: CountryOption[] = [
  {
    id: 1,
    countryCode: 'FR',
    phoneCode: '+33',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg'
  },
  {
    id: 2,
    countryCode: 'LU',
    phoneCode: '+352',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg'
  },
  {
    id: 3,
    countryCode: 'BE',
    phoneCode: '+32',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg'
  },
  {
    id: 4,
    countryCode: 'CH',
    phoneCode: '+41',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg'
  },
  {
    id: 5,
    countryCode: 'CA',
    phoneCode: '+1',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg'
  }
];
