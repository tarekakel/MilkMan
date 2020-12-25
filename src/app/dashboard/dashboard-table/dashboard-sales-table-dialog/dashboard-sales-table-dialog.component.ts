import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GetDataService } from 'src/app/shared/get-data.service';
import { DatePipe } from '@angular/common';
import { GetDateService } from '../../../shared/get-date.service';
import * as _moment from 'moment';

@Component({
  selector: 'app-dashboard-sales-table-dialog',
  templateUrl: './dashboard-sales-table-dialog.component.html',
  styleUrls: ['./dashboard-sales-table-dialog.component.css'],
  providers: [DatePipe]
})
export class DashboardSalesTableDialogComponent implements OnInit {
  dataCards = [];
  counto = [];
  loading = true;
  constructor(private getDataService: GetDataService,
    public dialogRef: MatDialogRef<DashboardSalesTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private datePipe: DatePipe
    , private getDateService: GetDateService) {




  }

  ngOnInit() {


    //dashboard?dateone=07/26/2018&dateTwo=05/27/2018&DateType=DAY


    let m = Number(this.datePipe.transform(this.data["act_date"], 'MM')) - 1;
    let y = Number(this.datePipe.transform(this.data["act_date"], 'yyyy'));
    let d = Number(this.datePipe.transform(this.data["act_date"], 'dd')) - 1;

    let dateTwo = _moment(new Date(y, m, d)).format('MM/DD/YYYY');
    let dateOne = this.datePipe.transform(this.data["act_date"], 'MM/dd/yyyy');

    let x = this;
    this.getDataService.getJsonWithParam('dashboard', { dateone: dateOne, dateTwo: dateTwo, DateType: 'DAY' }).subscribe(Response => {
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
