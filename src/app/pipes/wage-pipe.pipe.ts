import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wagePipe'
})
export class WagePipePipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'number') {
      return value + '$';
    } else if (typeof value === 'string' && !isNaN(Number(value))) {
      return value + '$';
    } else {
      return value;
    }
  }

}
