import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx/xlsx';
import { GetDataService } from '../../shared/get-data.service';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ExportExcelService } from '../../shared/export-excel.service';



@Component({
  selector: 'app-dashboard-finance-filter',
  templateUrl: './dashboard-finance-filter.component.html',
  styleUrls: ['./dashboard-finance-filter.component.css']
})
export class DashboardFinanceFilterComponent implements OnInit {
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  fromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 1)));

  reportDate;
  //  Excel = require('exceljs');
  SalesTypes = [
    { name: 'Sales', id: 'SALES' },
    { name: 'Sales Return', id: 'SALES RETURN' },
    { name: 'Net Sales', id: 'NET SALES' },
    { name: 'Discount/Offers', id: 'OFFERS' }
  ];
  AmountCounts = [
    { name: 'Amount', id: 'AMOUNT' },
    { name: 'Count', id: 'COUNT' }
  ];
  SalesType = { name: 'Sales', id: 'SALES' };
  AmountCount = { name: 'Amount', id: 'AMOUNT' };


  @Output() applyFilters: EventEmitter<any> = new EventEmitter();



  loading = false;


  constructor(private getDataService: GetDataService, private excelJsService: ExportExcelService) { }

  from = "";

  ngOnInit() {
    this.reportDate = new Date(this.y, this.m, this.d - 1);
    this.from = _moment(new Date(this.y, this.m, this.d - 1)).format('MM/DD/YYYY');
    this.SalesType = { name: 'Sales', id: 'SALES' };
    this.AmountCount = { name: 'Amount', id: 'AMOUNT' };
    this.apply();
  }

  ChangeFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.reportDate = event.value;
    this.from = _moment(event.value).format('MM/DD/YYYY');
  }


  selectSalesType(value) {
    this.SalesType = value;
  }

  selectAmountCount(value) {
    this.AmountCount = value;
  }

  apply() {
    this.applyFilters.emit({
      type: this.SalesType.id,
      category: this.AmountCount.id,
      from: this.from
    });
  }

  resopnse_count = 0;
  //
  _amount_sales = [];
  _amount_ret_sales = [];
  _amount_net_sales = [];
  _amount_offers = [];

  //
  _count_sales = [];
  _count_ret_sales = [];
  _count_net_sales = [];
  _count_offers = [];

  timer;
  Export() {
    // this.loading = true;
    let x = this;
    this.loading = true;
    //amount
    this.getDataService.getJsonWithParam("Finance", {
      type: this.SalesTypes[0].id,
      category: this.AmountCounts[0].id,
      from: this.from
    }).subscribe(Response => {
      let _body = <Array<any>>Response.body;
      x._amount_sales = _body;
      x.resopnse_count = x.resopnse_count + 1;
    });

    this.getDataService.getJsonWithParam("Finance", {
      type: this.SalesTypes[1].id,
      category: this.AmountCounts[0].id,
      from: this.from
    }).subscribe(Response => {
      let _body = <Array<any>>Response.body;
      x._amount_ret_sales = _body;
      x.resopnse_count = x.resopnse_count + 1;
    });


    this.getDataService.getJsonWithParam("Finance", {
      type: this.SalesTypes[2].id,
      category: this.AmountCounts[0].id,
      from: this.from
    }).subscribe(Response => {
      let _body = <Array<any>>Response.body;
      x._amount_net_sales = _body;
      x.resopnse_count = x.resopnse_count + 1;
    });

    this.getDataService.getJsonWithParam("Finance", {
      type: this.SalesTypes[3].id,
      category: this.AmountCounts[0].id,
      from: this.from
    }).subscribe(Response => {
      let _body = <Array<any>>Response.body;
      x._amount_offers = _body;
      x.resopnse_count = x.resopnse_count + 1;
    });

    //count
    this.getDataService.getJsonWithParam("Finance", {
      type: this.SalesTypes[0].id,
      category: this.AmountCounts[1].id,
      from: this.from
    }).subscribe(Response => {
      let _body = <Array<any>>Response.body;
      x._count_sales = _body;
      x.resopnse_count = x.resopnse_count + 1;
    });

    this.getDataService.getJsonWithParam("Finance", {
      type: this.SalesTypes[1].id,
      category: this.AmountCounts[1].id,
      from: this.from
    }).subscribe(Response => {
      let _body = <Array<any>>Response.body;
      x._count_ret_sales = _body;
      x.resopnse_count = x.resopnse_count + 1;
    });


    this.getDataService.getJsonWithParam("Finance", {
      type: this.SalesTypes[2].id,
      category: this.AmountCounts[1].id,
      from: this.from
    }).subscribe(Response => {
      let _body = <Array<any>>Response.body;
      x._count_net_sales = _body;
      x.resopnse_count = x.resopnse_count + 1;
    });

    this.getDataService.getJsonWithParam("Finance", {
      type: this.SalesTypes[3].id,
      category: this.AmountCounts[1].id,
      from: this.from
    }).subscribe(Response => {
      let _body = <Array<any>>Response.body;
      x._count_offers = _body;
      x.resopnse_count = x.resopnse_count + 1;
    });

    this.timer = interval(5000).pipe(
      map((x) => {
        if (this.resopnse_count == 8) {
          this.ExportExcel();
          this.timer.unsubscribe();
        }
      })
    ).subscribe();

  }
  ExportExcel() {
    this.initExcel();
    this.loading = false;
  }


  initExcel() {
    this.excelJsService.exportCustomExcelFile(
      "Sales Report "+ _moment(this.reportDate).format('YYYY , DD-MMM'),
      _moment(this.reportDate).format('YYYY , DD-MMM '),
      this._amount_sales,
      this._amount_ret_sales,
      this._amount_net_sales,
      this._amount_offers,
      this._count_sales,
      this._count_ret_sales,
      this._count_net_sales,
      this._count_offers);
  }

}
