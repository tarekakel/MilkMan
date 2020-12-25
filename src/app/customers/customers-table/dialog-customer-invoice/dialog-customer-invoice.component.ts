import { Component, OnInit, Inject, HostListener } from "@angular/core";
import { GetDataService } from "src/app/shared/get-data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OrderByPipe } from "src/app/shared/order-by.pipe";
import * as _moment from "moment";
import * as shape from "d3-shape";

@Component({
  selector: "app-dialog-customer-invoice",
  templateUrl: "./dialog-customer-invoice.component.html",
  styleUrls: ["./dialog-customer-invoice.component.css"]
})
export class DialogCustomerInvoiceComponent implements OnInit {
  ChartLoading = true;
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  from = _moment(new Date(this.y, this.m, this.d - 60)).format("MM/DD/YYYY");
  to = _moment(new Date()).format("MM/DD/YYYY");

  constructor(
    private getDataService: GetDataService,
    public dialogRef: MatDialogRef<DialogCustomerInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceDialogData,
    private orderBy: OrderByPipe
  ) {}

  colorScheme = {
    domain: [
      "#a3d175",
      "#d1ba75",
      "#8c75d1",
      "#d175d1",
      "#d18c75",
      "#ba75d1",
      "#d17575",
      "#d1a375",
      "#d1d175",
      "#d175a3",
      "#75d175",
      "#75d1d1",
      "#75bad1",
      "#758cd1",
      "#75a3d1",
      "#75d1ba"
    ]
  };

  loading = true;
  dataTable = [];
  columnsDef = [];
  addFilter = false;
  pageSizeOptions = [10];
  ShowTable = true;
  nodata = false;
  ChartData = [];

  ELEMENT_DATA = [];
  noData = true;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = "Date";
  showYAxisLabel = true;
  yAxisLabel = "Sales Amount";
  curve: any = shape.curveCatmullRom.alpha(0.5);

  // line, area
  autoScale = true;
  ngOnInit() {
    if (window.innerWidth > 1144) {
      this.dyWH = [window.innerWidth / 1.7 - 100, 0];
    } else if (window.innerWidth <= 1144 && window.innerWidth > 989) {
      this.dyWH = [window.innerWidth - 300, 0];
    } else if (window.innerWidth <= 989) {
      this.dyWH = [window.innerWidth - 240, 0];
    }
    let x = this;
    this.getDataService
      .getJsonWithParam("customers", { shopname: this.data.account_name })
      .subscribe(Response => {
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

    //Customers/Material?shopcode

    this.getDataService
      .getJsonWithParam("Customers/Material", {
        shopcode: this.data.account_code
      })
      .subscribe(Response => {
        let _data = <Array<any>>Response.body;
        console.log(_data);
        let temp = [];
        for (let index = 0; index < _data.length; index++) {
          const element = _data[index];
          temp.push({
            key: element["Material_Name"],
            y: element["Total_sales_amount"],
            disabled: false
          });
        }
        x.ChartData = temp;
      });
    this.ChartLoading = true;
    this.getDataService
      .getJson(
        'sales?Filters={}&Filter1={"city":"' +
          this.data.city +
          '","area":"' +
          this.data.area +
          '","Account_Name":"' +
          this.data.account_name +
          '"}&GroupBy={"DateFor":"DAY"}&From=' +
          this.from +
          "&To=" +
          this.to +
          "&SalesMan=&SALESTYPE=SALES&SUBTYPE="
      )
      .subscribe(_Array => {
        x.ELEMENT_DATA = [];
        let temp = [];
        for (let index = 0; index < (<Array<any>>_Array).length; index++) {
          const element = (<Array<any>>_Array)[index];
          temp.push({ name: element["DAY"], value: element["Total_Amount"] });
        }
        temp = this.orderBy.transform(temp, "name", 1);
        for (let index = 0; index < temp.length; index++) {
          const element = temp[index];
          temp[index] = { name: element["name"], value: element["value"] };
        }
        x.ELEMENT_DATA = [
          {
            name: "Sales Amount",
            series: temp
          }
        ];
        x.ChartLoading = false;
        if (x.ELEMENT_DATA.length == 0) {
          x.noData = true;
        } else {
          x.noData = false;
        }
        console.log(x.ELEMENT_DATA);
      });
  }
  dyWH = [];
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log(window.innerWidth);

    if (window.innerWidth > 1144) {
      this.dyWH = [window.innerWidth / 1.7 - 100, 0];
    } else if (window.innerWidth <= 1144 && window.innerWidth > 989) {
      this.dyWH = [window.innerWidth - 300, 0];
    } else if (window.innerWidth <= 989) {
      this.dyWH = [window.innerWidth - 240, 0];
    }
  }
  onSelect(event) {}
  initTable(keys) {
    this.columnsDef = [];

    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];

      let title = "";
      let format = "";
      let icon = "";
      let option = "";
      let iconColor = "";
      if (element == "Sales_date") {
        title = "Date";
        format = "date";
      }
      if (element == "city") {
        title = "City";
      }
      if (element == "account_name") {
        title = "Shop Name";
      }
      if (element == "Invoice_number") {
        title = "Invoice";
      }
      if (element == "Material_name") {
        title = "Material Name";
      }
      if (element == "total_sales_amount") {
        title = "Sales Amount .SPY";
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
        th_style: "",
        icon: icon,
        option: option,
        iconColor: iconColor,
        icons: [
          {
            status: "string",
            name: "string",
            style: "string"
          }
        ]
      });
    }
  }
}

export class InvoiceDialogData {
  account_name;
  account_code;
  area;
  city;
}
