import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesFiltersComponent } from './sales-filters/sales-filters.component';
import * as _moment from 'moment';
import { GetDataService } from '../shared/get-data.service';
import { ColumnsDef, Icon } from 'src/app/shared/tools/dynamic-table/dynamic-table.component';
import { DialogSalesChartComponent, ChartDialogData } from './dialog-sales-chart/dialog-sales-chart.component';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  table_status = 'pivot';
  from = "";
  to = "";
  CompanyName = "";
  CategoryName = "";
  Group_Code = "";
  Material_Code = "";
  CityName = "";
  AreaName = "";
  ShopName = "";
  GroupBy = "";
  SalesMan = "";
  Sales_Type = "";
  Sub_Type = "";
  GroupByClass = null;
  TableData = [];
  columnsDef: Array<ColumnsDef> = [];

  Loading = false;
  nodata = false;
  ShowTable = false;

  @ViewChild('sales_filter') sales_filter: SalesFiltersComponent;

  constructor(public dialog: MatDialog, private getDataService: GetDataService) {
  }


  openDialog(chartDialogData: ChartDialogData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.data = chartDialogData;
    this.dialog.open(DialogSalesChartComponent, dialogConfig);
  }
  Data = [];
  ngOnInit() {
    this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');
    this.to = _moment(new Date()).format('MM/DD/YYYY');
  }

  applyFilters($event) {
    this.from = $event.from;
    this.to = $event.to;
    this.CompanyName = $event.CompanyName;
    this.CategoryName = $event.CategoryName;
    this.Group_Code = $event.Group_Code;
    this.Material_Code = $event.Material_Code;
    this.CityName = $event.CityName;
    this.AreaName = $event.AreaName;
    this.ShopName = $event.ShopName;
    this.SalesMan = $event.SalesMan;
    this.Sales_Type = $event.Sales_Type;
    this.Sub_Type = $event.Sub_Type;
    this.GroupBy = $event.GroupBy;
    this.GroupByClass = $event.GroupByClass;
    this.table_status = $event.table_status;
    this.InitTable();
  }

  buildUri() {
    let uri = '';
    
    uri = 'sales?Filters={}';
    if (this.CompanyName != '' && this.CategoryName == '' && this.Group_Code == '' && this.Material_Code == '') {
      uri = 'sales?Filters={"Company":"' + this.CompanyName + '"}'
    }

    if (this.CompanyName != '' && this.CategoryName != '' && this.Group_Code == '' && this.Material_Code == '') {
      uri = 'sales?Filters={"Company":"' + this.CompanyName + '","materialID":"' + this.CategoryName + '"}';
    }

    if (this.CompanyName != '' && this.CategoryName != '' && this.Group_Code != '' && this.Material_Code == '') {
      uri = 'sales?Filters={"Company":"' + this.CompanyName + '","materialID":"' + this.CategoryName + '","Group_Code":"' + this.Group_Code + '"}';
    }

    if (this.CompanyName != '' && this.CategoryName != '' && this.Group_Code != '' && this.Material_Code != '') {
      uri = 'sales?Filters={"Company":"' + this.CompanyName + '","materialID":"' + this.CategoryName + '","Group_Code":"' + this.Group_Code + '","Material_Code":"' + this.Material_Code + '"}';
    }

    if (this.CityName != "") {
      if (this.ShopName == "" && this.AreaName != "") {
        uri += '&Filter1={"city":"' + this.CityName + '","area":"' + this.AreaName + '"}';
      } else if (this.ShopName != "" && this.AreaName != "") {
        uri += '&Filter1={"city":"' + this.CityName + '","area":"' + this.AreaName + '","Account_Name":"' + this.ShopName + '"}';
      } else {
        uri += '&Filter1={"city":"' + this.CityName + '"}';
      }
    } else {
      uri += '&Filter1={}';
    }


    if (this.GroupBy != '') {
      uri += '&GroupBy=' + this.GroupBy;
    } else {
      uri += '&GroupBy={}'
    }


    uri += '&From=' + this.from + '&To=' + this.to;

    if (this.SalesMan == '') {
      uri += '&SalesMan=';
    }
    else {
      uri += '&SalesMan=' + this.SalesMan;
    }

    if (this.Sales_Type == '') {
      uri += '&SALESTYPE=';
    }
    else {
      uri += '&SALESTYPE=' + this.Sales_Type;
    }

    if (this.Sub_Type == '') {
      uri += '&SUBTYPE=';
    }
    else {
      uri += '&SUBTYPE=' + this.Sub_Type;
    }


    console.log(uri);
    return uri;

  }

  uri: String;

  InitTable() {
    let x = this;
    this.uri = this.buildUri();
    this.ShowTable = true;
    this.Loading = true;
    this.nodata = false;
    this.getDataService.getJson(this.uri).subscribe(_Array => {
      console.log(_Array);
      if ((<Array<any>>_Array).length != 0) {
        if ((<Array<any>>_Array)[0]["Total_Amount"] != null) {
          for (let index = 0; index < (<Array<any>>_Array).length; index++) {

            const element = (<Array<any>>_Array)[index];
            // if ((element.DAY || element.MONTH) && element.city && element.area && element.Account_Name) {
            //   (<Array<any>>_Array)[index].trend = "";
            // }


            let keys = Object.keys(element);
            if (keys.indexOf("DAY") != -1) {
              // let tdate = (<String>(_Array[index]["DAY"])).split('-');
              // (<Array<any>>_Array)[index]["DAY"] = tdate[2] + '-' + tdate[1] + '-' + tdate[0];

            }
            if (keys.indexOf("MONTH") != -1) {
              //console.log((<Array<any>>_Array)[index]["MONTH"]);
            }

          }
          x.InitColumns(_Array);
          x.TableData = <Array<any>>_Array;
          console.log(x.TableData)
        }
        else {
          x.nodata = true;
        }
      } else {
        x.nodata = true;
      }

      x.Loading = false;
    });
  }

  InitColumns(Data) {

    const element = Data[0];

    this.columnsDef = [];

    let keys = Object.keys(element);

    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      let title = "";
      let format = "";
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
      let icon;
      let option = '';
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
        iconColor :'',
        Total:null,
        icons: [{
          status: 'string',
          name: 'string',
          style: 'string'
        }]
      });
    }
  }

  optionClick($event) {
    let chartDialogData = new ChartDialogData();

    chartDialogData.event = $event;
    chartDialogData.from = this.from;
    chartDialogData.to = this.to;
    chartDialogData.CompanyName = this.CompanyName;
    chartDialogData.CategoryName = this.CategoryName;
    chartDialogData.Group_Code = this.Group_Code;
    chartDialogData.Material_Code = this.Material_Code;
    chartDialogData.CityName = this.CityName;
    chartDialogData.AreaName = this.AreaName;
    chartDialogData.ShopName = this.ShopName;
    chartDialogData.GroupBy = this.GroupBy;
    chartDialogData.GroupByClass = this.GroupByClass;
    chartDialogData.SalesMan = this.SalesMan;
    this.openDialog(chartDialogData);

  }


}
