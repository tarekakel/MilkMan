import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { GetDataService } from '../../shared/get-data.service';
import { duration } from 'moment';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { InvoiceDialogData, DialogCustomerInvoiceComponent } from './dialog-customer-invoice/dialog-customer-invoice.component';
import { DialogCustomerVisitsComponent, VisitsDialogData } from './dialog-customer-visits/dialog-customer-visits.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnChanges {


  @Input()
  duration;
  @Input()
  city;
  @Input()
  area;
  @Input()
  shopname;

  @Input()
  SalesMan;
  constructor(public dialog: MatDialog, private getDataService: GetDataService) {

  }

  openDialog(chartDialogData: InvoiceDialogData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.height = '555px'
    dialogConfig.data = chartDialogData;
    this.dialog.open(DialogCustomerInvoiceComponent, dialogConfig);
  }

  openVisitsDialog(chartDialogData: VisitsDialogData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.height = '555px'
    dialogConfig.data = chartDialogData;
    this.dialog.open(DialogCustomerVisitsComponent, dialogConfig);
  }

  loading = true;
  data = [];
  columnsDef = [];
  addFilter = false;
  pageSizeOptions = [10, 50, 100, 150, 200];
  ShowTable = true;
  nodata = false;
  ngOnChanges() {
    let x = this;
    x.loading = true;
    x.nodata = false;
    x.getDataService.getJsonWithParam('customers/ALL', {
      duration: x.duration,
      city: x.city,
      area: x.area,
      ShopName: x.shopname,
      SalesMan: x.SalesMan
    }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      if (_data.length != 0) {
        x.initTable(Object.keys(_data[0]));
        for (let index = 0; index < _data.length; index++) {
          let val = _data[index]["Status"];
          if (!x.isNumeric(val)) {
            _data[index].statusOption = 'good';
            // _data[index]["Status"] = { value: val, td_style: { "background": "#b3ffb3" } };
          } else {
            let n = Number(val);
            val = val + ' Day';
            _data[index]["Status"] = val;
            if (n == 0) {
              _data[index].statusOption = '';
            } else {
              _data[index].statusOption = '';
            }
          }
        }
        x.data = _data;
        x.nodata = false;
        this.ShowTable = true;
      } else {
        x.nodata = true;
      }
      x.loading = false;

    });

  }

  optionClick($event) {
    console.log($event)
    if($event.option == 'click'){
      let data = new InvoiceDialogData()
      data.account_name = $event.element.Account_Name;
      data.account_code = $event.element.Account_Code;
      data.city = $event.element.City;
      data.area = $event.element.Area;
      this.openDialog(data)
    }
    if($event.option == 'viewVisits'){
      let data = new VisitsDialogData()
      data.account_name = $event.element.Account_Name;
      data.account_code = $event.element.Account_Code;
      this.openVisitsDialog(data)
    }
  }

  initTable(keys) {
    this.columnsDef = [];

    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];

      let title = "";
      let format = "";
      let option = "";
      let icon = "";
      let iconColor = '';
      if (element == 'date') {
        title = 'Date';
        format = 'date';
      }
      if (element == 'Account_Name') {
        title = 'Shop Name'
        option = 'click';
        iconColor = '#ffb380'
        icon = 'info'
      }
      if (element == 'Account_Code') {
        title = 'Shop Code';
      }
      if (element == 'SalesMan') {
        title = 'Sales Man';
      }
      if (element == 'Head') {
        title = 'Head'
      }
      if (element == 'TotalInvoice') {
        title = 'Total Invoice';
        format = 'number';
      }
      if (element == 'total_sales_amount') {
        title = 'Total Sales Amount .SYP'
        format = 'number';
      }
      if (element == 'MaxInvoiceDate') {
        title = 'Max Invoice Date'
        format = 'date';
      }
      if (element == 'FirstInvoiceDate') {
        title = 'First Invoice Date'
        format = 'date';
      }
      if (element == 'LastInvoiceDate') {
        title = 'Last Invoice Date'
        format = 'date';
      }
      if(element == 'Idle for'){
        title = "Last Visit"
      }
      if(element == 'Status'){
        title = "Ageing";
        option = 'viewVisits';
        iconColor = '#ff0000'
        icon = 'question_mark'
      }
      if(element != 'Status')
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

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}

