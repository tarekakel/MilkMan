import { Component, OnInit, ViewChild } from '@angular/core';
import * as _moment from 'moment';
import { GetDataService } from '../shared/get-data.service';
import { ColumnsDef } from 'src/app/shared/tools/dynamic-table/dynamic-table.component';
import { VisitsFilterComponent } from './visits-filter/visits-filter.component';


@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
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
  GroupByClass = null;
  TableData = [];
  columnsDef: Array<ColumnsDef> = [];

  Loading = false;
  nodata = false;
  ShowTable = false;


  @ViewChild('visits_filter') visits_filter: VisitsFilterComponent;

  constructor(private getDataService: GetDataService) {
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
    this.GroupBy = $event.GroupBy;
    this.GroupByClass = $event.GroupByClass;
    this.table_status = $event.table_status;
    this.InitTable();
  }

  buildUri() {
    let uri = '';
    let table = '';
    if (this.table_status == 'pivot') {
      table = 'visit';
    } else {
      table = 'visit/un';
    }
    uri = table + '?Filters={}';
    if (this.CompanyName != '' && this.CategoryName == '' && this.Group_Code == '' && this.Material_Code == '') {
      uri = table + '?Filters={"Company":"' + this.CompanyName + '"}'
    }

    if (this.CompanyName != '' && this.CategoryName != '' && this.Group_Code == '' && this.Material_Code == '') {
      uri = table + '?Filters={"Company":"' + this.CompanyName + '","materialID":"' + this.CategoryName + '"}';
    }

    if (this.CompanyName != '' && this.CategoryName != '' && this.Group_Code != '' && this.Material_Code == '') {
      uri = table + '?Filters={"Company":"' + this.CompanyName + '","materialID":"' + this.CategoryName + '","Group_Code":"' + this.Group_Code + '"}';
    }

    if (this.CompanyName != '' && this.CategoryName != '' && this.Group_Code != '' && this.Material_Code != '') {
      uri = table + '?Filters={"Company":"' + this.CompanyName + '","materialID":"' + this.CategoryName + '","Group_Code":"' + this.Group_Code + '","Material_Code":"' + this.Material_Code + '"}';
    }

    if (this.CityName != "") {
      if (this.ShopName == "" && this.AreaName != "") {
        uri += '&Filter1={"city":"' + this.CityName + '","area":"' + this.AreaName + '"}';
      } else if (this.ShopName != "" && this.AreaName != "") {
        uri += '&Filter1={"city":"' + this.CityName + '","area":"' + this.AreaName + '","cuCustomerName":"' + this.ShopName + '"}';
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

      if ((<Array<any>>_Array).length != 0) {
        for (let index = 0; index < (<Array<any>>_Array).length; index++) {

          const element = (<Array<any>>_Array)[index];
          if ((element.DAY || element.MONTH) && element.city && element.area && element.Account_Name) {
            (<Array<any>>_Array)[index].trend = " ";
          }


          let keys = Object.keys(element);
          if (keys.indexOf("DAY") != -1) {
            let tdate = (<String>(_Array[index]["DAY"])).split('/');
            (<Array<any>>_Array)[index]["DAY"] = tdate[2] + '-' + tdate[1] + '-' + tdate[0];

          }
          if (keys.indexOf("MONTH") != -1) {
            //console.log((<Array<any>>_Array)[index]["MONTH"]);
          }

        }
        x.InitColumns(_Array);
        x.TableData = <Array<any>>_Array;

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
    let temp = [];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      let title = "";
      let format = "";
      if (element.indexOf("المدة الزمنية") != -1) {
        format = "secondsToHhmmss";
      } else if (element.indexOf("زيار") != -1) {
        format = "number";
      }
      if (element == "date1") {
        title = "Date";
        format = "tdate";
      }
      if (element == "sales_man") {
        title = "Sales Man";
      }
      if (element == "cuCustomerName") {
        title = "Shop Name";
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
      if(element == 'Proid'){
        format = "secondsToHhmmss";
      }
      if(element == "Total"){
        format = "number";
      }
      if(element == "Total"){
        title = "Sales Amount .SYP"
      }
      if(element == "shop"){
        title = "Shops (Count)"
      }
      let icon;
      let option = '';
      if (element == "trend") {
        title = "trend";
        icon = 'bar_chart';
        option = 'click';
      }
      temp.push({
        def: element,
        title: title == "" ? element : title,
        format: format,
        td_style: {},
        th_style: '',
        icon: icon,
        option: option,
        iconColor: '',
        icons: [{
          status: 'string',
          name: 'string',
          style: 'string'
        }]
      });
    }
    let temp1 = [];
    let temp2 = [];

    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
      if (element.def.indexOf("زيارة") != -1) {
        if (window.location.href.indexOf('test') != -1) {
          element.format = '';
        }
        temp2.push(element);
      }
      else {
        temp1.push(element);
      }
    }

    for (let index = 0; index < temp1.length; index++) {
      this.columnsDef.push(temp1[index]);
    }
    for (let index = 0; index < temp2.length; index++) {
      this.columnsDef.push(temp2[index]);
    }
  }

}
