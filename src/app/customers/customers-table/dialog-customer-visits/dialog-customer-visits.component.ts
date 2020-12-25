import { Component, OnInit, Inject } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderByPipe } from 'src/app/shared/order-by.pipe';

@Component({
  selector: 'app-dialog-customer-visits',
  templateUrl: './dialog-customer-visits.component.html',
  styleUrls: ['./dialog-customer-visits.component.css']
})
export class DialogCustomerVisitsComponent implements OnInit {
  columnsDef = [];
  dataTable = [];
  pageSizeOptions = [15,20,50,70]
  nodata = false;
  ShowTable = true;
  loading = true;
  constructor(private getDataService: GetDataService,
    public dialogRef: MatDialogRef<DialogCustomerVisitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VisitsDialogData, private orderBy: OrderByPipe) {





  }

  ngOnInit() {
    let x = this;

    this.getDataService.getJsonWithParam('Customers/Visit', { shopname: this.data.account_name }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      if (_data.length != 0) {
        x.initTable(Object.keys(_data[0]));
        x.dataTable = _data;
        x.nodata = false;
      } else {
        x.nodata = true;
      }
      x.loading = false;
    });

  }

  initTable(keys) {
    this.columnsDef = [];
    console.log(keys);
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];

      let title = '';
      let format = '';
      let icon = '';
      let option = '';
      let iconColor = '';


      if (element == "Date") {
        title = "Date";
        format = "tdate"
      }
      if (element == "city") {
        title = "City";
      }
      if (element == "account_name") {
        title = "Account Name";
      }
      if (element == "type") {
        title = "Type";
      }
      if (element == "Invoice number") {
        title = "Invoice";
      }
      if (element == "Invoice_type") {
        title = "Invoice Type";
      }
      if (element == "Material_name") {
        title = "Material Name";
      }
      if (element == "StartTime") {
        title = "Start Time";
      }
      if (element == "FinishTime") {
        title = "Finish Time";
      }
      if (element == "total") {
        title = "Sale Amount .SPY";
        format = "number";
      }
      if (element == "total_sales_count") {
        title = "Item Count (Sales)";
        format = "number";
      }
      if (element == "Gift_Count") {
        title = "Item Count (offer)";
        format = "number";
      }
      if (element == "Gift_Cost") {
        title = "Offer Cost .SPY";
        format = "number";
      }
      if (element == "salesman") {
        title = "Sales Man";
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


export class VisitsDialogData {
  account_name;
  account_code;
  area;
  city;
}