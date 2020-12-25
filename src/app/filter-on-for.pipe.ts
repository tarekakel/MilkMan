import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOnFor'
})
export class FilterOnForPipe implements PipeTransform {

  transform(items: any[], colname: string, filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item[colname].indexOf(filter) !== -1);
  }

}
