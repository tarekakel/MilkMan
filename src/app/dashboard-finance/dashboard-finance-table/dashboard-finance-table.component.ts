import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../shared/get-data.service';
import { ColumnsDef } from 'src/app/shared/tools/dynamic-table/dynamic-table.component';
import * as _moment from 'moment';
@Component({
  selector: 'app-dashboard-finance-table',
  templateUrl: './dashboard-finance-table.component.html',
  styleUrls: ['./dashboard-finance-table.component.css']
})
export class DashboardFinanceTableComponent implements OnInit {

  nodata = false;
  loading = false;
  TableData = [];
  columnsDef: Array<ColumnsDef> = [];
  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
  }

  apply(filter) {
    let x = this;
    this.loading = true;
    this.nodata = false;
    this.columnsDef = [];
    this.TableData = [];
    this.getDataService.getJsonWithParam("Finance", filter).subscribe(Response => {
      let _body = <Array<any>>Response.body;

      if (_body.length != 0) {
        let total_sales = 0;
        let total_mtd = 0;
        let total_bdg = 0;
        let total_count = _body.length;
        for (let index = 0; index < _body.length; index++) {
          const element = _body[index];
          total_sales += Number(_body[index][Object.keys(_body[0])[2]]);
          total_bdg += Number(_body[index][Object.keys(_body[0])[3]]);
          _body[index][Object.keys(_body[0])[3]] = Math.round(Number(_body[index][Object.keys(_body[0])[3]]));
          total_mtd += Number(_body[index][Object.keys(_body[0])[6]]);
        }
        x.initTable(Object.keys(_body[0]), filter.from, total_sales, total_bdg, total_count, total_mtd);
        x.TableData = _body;
        x.loading = false;
      }
      else {
        x.nodata = true;
      }
    })
  }

  initTable(cols, date, total_sales, total_bdg, total_count, total_mtd) {
    this.columnsDef = [];
    for (let index = 0; index < cols.length; index++) {
      const element = cols[index];
      let title = "";
      let format = "";
      let icon;
      let option = '';
      let Total = null;
      if (element.indexOf("Budget") !== -1) {
        Total = (d3.format(',')(Math.round(total_bdg)));
        format = "number";
      }
      if (element == "MTD") {
        format = "number";
        Total = (d3.format(',')(total_mtd));
      }
      if (element.indexOf("SALES on") !== -1 || element.indexOf("RETURN") !== -1 || element.indexOf("OFFERS") !== -1) {
        Total = (d3.format(',')(total_sales));
        format = "number";
      }
      if (element == "Descriptions") {
        Total = "Total"
      }
      if (element == "lastyear") {
        title = "Last Year";
        format = "number";
      }
      if (element == "Budget") {
        format = "number";
      }
      if (element == "invoice_number") {
        title = "Invoice Number";
      }
      if (element == "VCompany") {
        title = "Company";
      }
      if (element == "Vmaterial") {
        title = "Category Name";
      }
      if (element == "Vgroup_name") {
        title = "Group Name";
      }
      if (element == "VMaterial_Name") {
        Total = (d3.format(',')(total_count));
        title = "Material Name";
      }
      if (element == "VMaterial_Code") {
        title = "Material Code";
      }
      if (element == "DAY") {
        title = "Day";
        format = "tdate";
      }
      if (element == "MONTH") {
        title = "Month";
        format = "tmonth"
      }
      if (element == "YEAR") {
        title = "Year";
      }
      if (element == "QUARTER") {
        title = "Quarter";
      }
      if (element == "city") {
        title = "City";
      }
      if (element == "area") {
        title = "Area";
      }
      if (element == "Account_Name") {
        title = "Shop Name";
      }
      if (element == "Total_Amount") {
        title = "Sales Amount .SYP";
        format = "number";
      }
      if (element == "Total_count") {
        title = "Item Count (Sales)";
        format = "number";
      }
      if (element == "Gift_Cost") {
        title = "Offer Cost .SYP";
        format = "number";
      }
      if (element == "Gift_Count") {
        title = "Item Count (offer)";
        format = "number";
      }

      if (element == "trend") {
        title = "trend";
        icon = 'bar_chart';
        option = 'click';
      }
      this.columnsDef.push({
        def: element,
        title: title == "" ? element : title,
        format: format,
        td_style: {},
        th_style: '',
        icon: icon,
        option: option,
        iconColor: '',
        Total: Total,
        icons: [{
          status: 'string',
          name: 'string',
          style: 'string'
        }]
      });
    }
  }
}
