import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  public transform(dataSource: number | string, supCurrency: boolean = false): string {
    const value = dataSource.toString();
    const split = value.split('.');

    return `${split[0]}${supCurrency ? '<sup>€</sup>' : '€'}${split.length > 1 ? split[1] : ''}`;
  }
}
