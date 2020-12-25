import { Component, OnInit, Inject } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';

@Component({
  selector: 'app-dialog-customers-search-invoice',
  templateUrl: './dialog-customers-search-invoice.component.html',
  styleUrls: ['./dialog-customers-search-invoice.component.css']
})
export class DialogCustomersSearchInvoiceComponent implements OnInit {

  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  listMoth = [];
  fromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 90)));
  todate = new FormControl(_moment(new Date()));
  from;
  to;
  constructor(private getDataService: GetDataService,
    public dialogRef: MatDialogRef<DialogCustomersSearchInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceDialogData) {




  }


  loading = true;
  dataTable = [];
  columnsDef = [];
  addFilter = false;
  pageSizeOptions = [10];
  ShowTable = false;
  nodata = false;

  ngOnInit() {
    this.from = _moment(new Date(this.y, this.m, this.d - 90)).format('MM/DD/YYYY');
    this.to = _moment(new Date()).format('MM/DD/YYYY');
  }
  ChangeFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.from = _moment(event.value).format('MM/DD/YYYY');
  }

  ChangeTo(type: string, event: MatDatepickerInputEvent<Date>) {
    this.to = _moment(event.value).format('MM/DD/YYYY');
  }
  first = 0;
  last = 0;
  apply() {
    this.loading = true;
    this.ShowTable = true;
    let x = this;

    this.getDataService.getJsonWithParam('customers', { First: this.first, last: this.last, From: this.from, to: this.to }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      if (_data.length != 0) {
        x.initTable(Object.keys(_data[0]));
        x.dataTable = _data;
        x.nodata = false;
        this.ShowTable = true;
      } else {
        x.nodata = true;
      }
      x.loading = false;
    });



  }


  onSearchChange(value) {
  }
  favoriteWay = '1';
  initTable(keys) {
    this.columnsDef = [];

    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];

      let title = '';
      let format = '';
      let icon = '';
      let option = '';
      let iconColor = '';
      if (element == 'Date') {
        title = 'Date';
        format = 'date';
      }
      if (element == 'city') {
        title = 'City';
      }
      if (element == 'Account_Name') {
        title = 'Shop Name';
      }
      if (element == 'Invoice_Number') {
        title = 'Invoice';
        format = 'number';
      }
      if (element == 'Material_Name') {
        title = 'Material Name';
      }
      if (element == 'Amount') {
        title = 'Item Count (Sales)';
        format = 'number';
      }
      if (element == 'Total_seles_Amount') {
        title = 'Sales Amount .SPY';
        format = 'number';
      }
      if (element == 'Gift_Count') {
        title = 'Item Count (offer)';
        format = 'number';
      }
      if (element == 'Gift_Cost') {
        title = 'Offer Cost .SPY';
        format = 'number';
      }
      if (element == 'salesman') {
        title = 'Sales Man';
      }
      this.columnsDef.push({
        def: element,
        title: title == "" ? element : title,
        format: format,
        td_style: {},
        th_style: '',
        icon: icon,
        option: option,
        iconColor: iconColor,
        icons: [{
          status: 'string',
          name: 'string',
          style: 'string'
        }]
      });
    }


  }

}

export class InvoiceDialogData {

}