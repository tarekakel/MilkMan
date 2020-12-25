import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetDataService } from 'src/app/shared/get-data.service';
import { GetDateService } from 'src/app/shared/get-date.service';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';

@Component({
  selector: 'app-dashboard-sales-table-month-dialog',
  templateUrl: './dashboard-sales-table-month-dialog.component.html',
  styleUrls: ['./dashboard-sales-table-month-dialog.component.css'],
  providers: [DatePipe]
})
export class DashboardSalesTableMonthDialogComponent implements OnInit {

  dataCards = [];
  counto = [];
  loading = true;
  constructor(private getDataService: GetDataService,
    public dialogRef: MatDialogRef<DashboardSalesTableMonthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private datePipe: DatePipe
    , private getDateService: GetDateService) {

  }

  ngOnInit() {


    //dashboard?dateone=07/26/2018&dateTwo=05/27/2018&DateType=DAY


    let m = Number(this.datePipe.transform(this.data["act_month"], 'MM')) - 1;
    let y = Number(this.datePipe.transform(this.data["act_month"], 'yyyy'));
    let d = 1;

    let dateTwo = _moment(new Date(y, m - 1, d)).format('MM/DD/YYYY');
    let dateOne = this.datePipe.transform(this.data["act_month"], 'MM/dd/yyyy');

    
    let x = this;
    this.getDataService.getJsonWithParam('dashboard', { dateone: dateOne, dateTwo: dateTwo, DateType: 'MONTH' }).subscribe(Response => {
      x.dataCards = <Array<any>>Response.body;
      x.loading = false;
    });
  }

  onCountoEnd() {

  }

  countoChange($event, i) {
    this.counto[i] = Math.round($event);
  }

  colorScheme = {
    domain: ['#a3d175',
      '#d1ba75',
      '#8c75d1',
      '#d175d1',
      '#d18c75',
      '#ba75d1',
      '#d17575',
      '#d1a375',
      '#d1d175',
      '#d175a3',
      '#75d175',
      '#75d1d1',
      '#75bad1',
      '#758cd1',
      '#75a3d1',
      '#75d1ba']
  };
}

export class DialogData {
  data: any;
}
