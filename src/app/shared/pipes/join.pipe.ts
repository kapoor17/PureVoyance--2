import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  public transform(dataSource: string[]): string {
    return !dataSource || !dataSource.length
      ? ''
      : dataSource.join(', ');
  }
}
