import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe {
  constructor(){
    
  }
  transform(value: Array<any>, args: any, args1: any): any {
    value = value.sort((a, b) => this.check(a, b, args, args1));
    return value;
  }
  check(a, b, col, tpy) {
    let A = String(a[col]);
    let B = String(b[col]);

    A = A.replace(/[^a-zA-Z0-9]/g, '');
    B = B.replace(/[^a-zA-Z0-9]/g, '');

    if (this.isNumeric(A)) {
      let nA = Number(A);
      let nB = Number(B);
      if (tpy == 1) {
        return this.compareAsc(nA, nB);
      }
      else {
        return this.compareDesc(nA, nB);
      }
    }
    else if (Date.parse(A)) {
      let nA = Date.parse(A);
      let nB = Date.parse(B);
      if (tpy == 1) {
        return this.compareAsc(nA, nB);
      }
      else {
        return this.compareDesc(nA, nB);
      }
    }
    else {
      A = String(A).toLocaleLowerCase();
      B = String(B).toLocaleLowerCase();
      if (tpy == 1) {
        return this.compareAsc(A, B);
      }
      else {
        return this.compareDesc(A, B);
      }
    }
  }

  compareAsc(A, B) {
    let comparison = 0;
    if (A > B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;
  }


  compareDesc(A, B) {
    let comparison = 0;
    if (A < B) {
      comparison = 1;
    } else if (A > B) {
      comparison = -1;
    }
    return comparison;
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}