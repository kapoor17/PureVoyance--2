import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'integerPart'
})
export class IntegerPartPipe implements PipeTransform {
  public transform(dataSource: number | string, supCurrency: boolean = false): string {
    const value = dataSource.toString();
    const split = value.split('.');

    return split[0];
  }
}
