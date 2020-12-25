import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { ColumnsDef } from "src/app/shared/tools/dynamic-table/dynamic-table.component";
import { GetDataService } from "src/app/shared/get-data.service";
import * as _moment from "moment";
import { OrderByPipe } from "src/app/shared/order-by.pipe";

@Component({
  selector: "app-dashbord-visit-table",
  templateUrl: "./dashbord-visit-table.component.html",
  styleUrls: ["./dashbord-visit-table.component.css"]
})
export class DashbordVisitTableComponent implements OnInit, OnChanges {
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();

  @Input() from;
  @Input() to;
  @Input() tab;
  @Input() city;
  @Input() area;
  @Input() shopname;
  @Input() salesman;

  ShowTable = true;
  nodata = false;
  loading = true;
  data = [];
  columnsDef: Array<ColumnsDef> = [];
  pageSizeOptions = [10];

  constructor(private getDataService: GetDataService,private orderByPipe:OrderByPipe) {}

  ngOnInit() {}

  ngOnChanges() {
    let x = this;
    let uri = "visit?Filters={}&Filter1={";
    if (this.city != "") {
      uri += '"city":"' + this.city + '"';
    }
    if (this.area != "") {
      uri += ',"area":"' + this.area + '"';
    }
    if (this.shopname != "") {
      uri += ',"cuCustomerName":"' + this.shopname + '"';
    }

    this.to = _moment(new Date(this.y, this.m, this.d)).format("MM/DD/YYYY");
    if (this.tab == "MONTH") {
      this.from = _moment(new Date(this.y, this.m, this.d - 365)).format(
        "MM/DD/YYYY"
      );
      uri +=
        '}&GroupBy={"DateFor":"' +
        this.tab +
        '"}&From=' +
        this.y +
        "&To=" +
        this.to +
        "&SalesMan=" +
        this.salesman;
    } else {
      this.from = _moment(new Date(this.y, this.m, this.d - 20)).format(
        "MM/DD/YYYY"
      );
      uri +=
        '}&GroupBy={"DateFor":"' +
        this.tab +
        '"}&From=' +
        this.from +
        "&To=" +
        this.to +
        "&SalesMan=" +
        this.salesman;
    }

    this.loading = true;
    this.nodata = false;
    console.log(uri);
    this.getDataService.getJson(uri).subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      if (__Array.length != 0) {
        let temp = <Array<any>>_Array;

        

        x.initTable(Object.keys(temp[0]));

        x.data = this.orderByPipe.transform(temp,this.matSortActive,2);
        this.matSortActive = this.matSortActive;
        this.matSortDirection = "desc";
      } else {
        x.nodata = true;
      }
      x.loading = false;
    });
  }

  matSortActive = "";
  matSortDirection = "";

  initTable(keys) {
    this.columnsDef = [];
    let temp = [];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];

      let title = "";
      let format = "";
      let icon = "";
      let option = "";
      let td_style = {};

      if (element == "DAY") {
        format = "tdate";
        this.matSortActive = element;
        this.matSortDirection = "desc";
        td_style = { "font-weight": "bold", "white-space": "nowrap" };
      } else if (element == "MONTH") {
        format = "tmonth";
        this.matSortActive = element;
        this.matSortDirection = "desc";
        td_style = { "font-weight": "bold", "white-space": "nowrap" };
      } else {
        format = "number";
      }
      if (element.indexOf("المدة الزمنية") != -1) {
        format = "secondsToHhmmss";
      }

      if(element == "Total"){
        title = "Sales Amount .SYP"
      }
      if(element == "shop"){
        title = "Shops (Count)"
      }
      temp.push({
        def: element,
        title: title == "" ? element : title,
        format: format,
        td_style: td_style,
        th_style: "",
        icon: icon,
        iconColor: "",
        option: option,
        icons: [
          {
            status: "string",
            name: "string",
            style: "string"
          }
        ]
      });
    }
    let temp1 = [];
    let temp2 = [];

    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
      if (element.def.indexOf("زيارة") != -1) {
        if (window.location.href.indexOf("test") != -1) {
          element.format = "";
        }
        temp2.push(element);
      } else {
        temp1.push(element);
      }
    }

    for (let index = 0; index < temp1.length; index++) {
      this.columnsDef.push(temp1[index]);
    }
    for (let index = 0; index < temp2.length; index++) {
      this.columnsDef.push(temp2[index]);
    }
    this.matSortActive = this.matSortActive;
        this.matSortDirection = "desc";
  }
}
