import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDateService {

  constructor() { }

  getCurrentDate() : string{
    let strDate = "";
    let today = new Date();
    let dd = today.getDate();
    let mm = null;

    if (dd <= 0) {
      dd = dd + 30;
      mm = today.getMonth();
    } else {
      mm = today.getMonth() + 1;
    }

    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = 0 + dd;
    }

    if (mm < 10) {
      mm = 0 + mm;
    }
    strDate = mm + '/' + dd + '/' + yyyy;
    return strDate;
  }

  getDate(MinusOfDay : number) : string{
    let date = new Date();
    let last = new Date(date.getTime() - (MinusOfDay * 24 * 60 * 60 * 1000));
    let day = last.getDate();
    let month = last.getMonth() + 1;
    let year = last.getFullYear();
    let strDate = month + '/' + day + '/' + year;
    return strDate;
  }

  getString(date :Date){
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + '/' + (monthIndex+1) + '/' + year;
  }
}
