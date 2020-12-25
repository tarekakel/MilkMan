import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GetDataService } from '../../shared/get-data.service';
import { MatDatepickerInputEvent, MatSelect } from '@angular/material';
import { FormControl } from '@angular/forms';

import * as _moment from 'moment';

@Component({
  selector: 'app-visits-filter',
  templateUrl: './visits-filter.component.html',
  styleUrls: ['./visits-filter.component.css']
})
export class VisitsFilterComponent implements OnInit {

  panelOpen = true;
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  fromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 20)));
  todate = new FormControl(_moment(new Date()));
  table_status = 'pivot';
  from = "";
  to = "";
  CompanyNames = [];
  CompanyName = "";
  CategoryNames = [];
  CategoryName = "";
  GroupNames = [];
  Group_Code = "";
  MaterialNames = [];
  Material_Code = "";
  CityNames = [];
  CityName = "";
  AreaNames = [];
  AreaName = "";
  ShopNames = [];
  ShopName = "";
  SalesMans = [];
  SalesMan = "";
  @Output() applyFilters: EventEmitter<any> = new EventEmitter();


  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');

    this.to = _moment(new Date()).format('MM/DD/YYYY');
    let x = this;
    this.getDataService.getJson('salesfilter').subscribe(_Array => {
      x.CompanyNames = <Array<any>>_Array;
    });
    this.getDataService.getJson('sales').subscribe(_Array => {

      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = <Array<any>>_Array[index];
        temp.push({ name: element["City"], id: element["City"] });
      }
      x.CityNames = temp;
    });
    this.getDataService.getJson('salesMan').subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      let temp = [];

      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        temp.push({ name: element["SalesMan"], id: element["SalesMan"] });
      }
      x.SalesMans = temp;
    });


    x.AreaNames.push({ name: 'ALL', id: '' });
    x.ShopNames.push({ name: 'ALL', id: '' });
    this.apply();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let x = this;
    this.getDataService.getJson('salesfilter').subscribe(_Array => {
      x.CompanyNames = <Array<any>>_Array;
    });
  }

  pivot() {
    this.table_status = 'pivot';
  }
  unpivot() {
    this.table_status = 'unpivot';
  }

  selectCompany(value) {
    let x = this;
    x.CompanyName = value;
    x.CategoryNames = [...[]]
    x.GroupNames = [...[]];
    x.MaterialNames = [...[]];
    x.CategoryName = '';
    x.Group_Code = '';
    x.Material_Code = '';
    x.getDataService.getJson('salesfilter?Param={"Company":"' + value + '"}').subscribe(_Array => {
      x.CategoryNames = <Array<any>>_Array;
    });
  }

  selectCategory(value) {
    let x = this;
    x.CategoryName = value;
    x.GroupNames = [...[]];
    x.MaterialNames = [...[]];
    x.Group_Code = '';
    x.Material_Code = '';
    x.getDataService.getJson('salesfilter?Param={"Company":"' + x.CompanyName + '","materialID":"' + value + '"}').subscribe(_Array => {
      x.GroupNames = <Array<any>>_Array;
    });
  }


  selectGroup(value) {
    let x = this;
    x.Group_Code = value;
    x.MaterialNames = [...[]];
    x.Material_Code = '';
    //console.log('salesfilter?Param={"Company":"' + x.CompanyName + '","materialID":"' + x.CategoryName + '","Group_Code":"' + value + '"}');
    x.getDataService.getJson('salesfilter?Param={"Company":"' + x.CompanyName + '","materialID":"' + x.CategoryName + '","Group_Code":"' + value + '"}').subscribe(_Array => {
      x.MaterialNames = <Array<any>>_Array;
    });
  }

  selectMaterial(value) {

  }


  selectCity(value) {

    let x = this;
    x.CityName = value.id;
    x.AreaNames = [...[]];
    x.AreaName = '';
    x.ShopNames = [...[]];
    x.ShopName = '';
    x.getDataService.getJson('sales?next={"city":"' + x.CityName + '"}').subscribe(_Array => {
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = <Array<any>>_Array[index];
        temp.push({ name: element["area"], id: element["area"] });
      }
      x.AreaNames = temp;
    });
    x.ShopNames.push({ name: 'ALL', id: '' });
  }

  selectArea(value) {
    let x = this;
    x.AreaName = value.id;
    x.ShopNames = [...[]];
    x.ShopName = '';
    if (value.id)
      x.getDataService.getJson('sales?next={"city":"' + x.CityName + '","area":"' + x.AreaName + '"}').subscribe(_Array => {
        let temp = [];
        temp.push({ name: 'ALL', id: '' });
        for (let index = 0; index < (<Array<any>>_Array).length; index++) {
          const element = <Array<any>>_Array[index];
          temp.push({ name: element["Account_Name"], id: element["Account_Name"] });
        }
        x.ShopNames = temp;
      });
    x.ShopNames.push({ name: 'ALL', id: '' });
  }

  selectShop(value) {
    this.ShopName = value.id;
  }

  selectSalesMan(value) {
    this.SalesMan = value.id;
  }
  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  ChangeFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.from = _moment(event.value).format('MM/DD/YYYY');
  }

  ChangeTo(type: string, event: MatDatepickerInputEvent<Date>) {
    this.to = _moment(event.value).format('MM/DD/YYYY');
  }


  DateChecked;
  ScopeChecked;
  ItemCategoryChecked;
  SalesManChecked;
  disabledDate = false;
  disabledScope = false;
  disabledItemCategory = false;
  disabledSalesMan = false;

  GroupBy: Group = {
    Scop: '',
    Materials: '',
    Date: '',
    SalesMan: ''
  };

  DateChagne() {
    this.GroupBy.Date = '"DateFor":"' + this.DateChecked + '"';
  }

  disableDate() {

    if (this.disabledDate) {
      this.DateChecked = '';
      this.GroupBy.Date = '';
      this.disabledDate = false;
    }
    else {
      this.disabledDate = true;
      this.DateChecked = 'DAY';
      this.GroupBy.Date = '"DateFor":"DAY"';
    }
  }

  ScopeChagne() {
    if (this.ScopeChecked == 'city') {
      this.GroupBy.Scop = '"item2":"city"';
    }
    if (this.ScopeChecked == 'area') {
      this.GroupBy.Scop = '"item2":"city" ,"item3":"area"';
    } else if (this.ScopeChecked == 'cuCustomerName') {
      this.GroupBy.Scop = '"item2":"city" ,"item3":"area","item4":"cuCustomerName"';
    }
  }

  disableScope() {
    if (this.disabledScope) {
      this.ScopeChecked = '';
      this.GroupBy.Scop = '';
      this.disabledScope = false;
    }
    else {
      this.disabledScope = true;
      this.ScopeChecked = 'city';
      this.GroupBy.Scop = '"item2":"city"';
    }
  }

  ItemCategoryChagne() {

    this.GroupBy.Materials = '"item5":"' + this.ItemCategoryChecked + '"';

  }

  disableItemCategory() {
    if (this.disabledItemCategory) {
      this.ItemCategoryChecked = '';
      this.GroupBy.Materials = '';
      this.disabledItemCategory = false;
    }
    else {
      this.ItemCategoryChecked = 'VCompany';
      this.GroupBy.Materials = '"item5":"' + this.ItemCategoryChecked + '"';
      this.disabledItemCategory = true;
    }
  }


  SalesManChagne() {

    this.GroupBy.Materials = '"item5":"' + this.ItemCategoryChecked + '"';

  }

  disableSalesMan() {
    if (this.disabledSalesMan) {
      this.SalesManChecked = '';
      this.GroupBy.SalesMan = '';
      this.disabledSalesMan = false;
    }
    else {
      this.SalesManChecked = 'sales_man';
      this.GroupBy.SalesMan = '"item6":"' + this.SalesManChecked + '"';
      this.disabledSalesMan = true;
    }
  }




  apply() {

    let _GroupBy = '';

    if (this.GroupBy.Date != '') {
      _GroupBy += this.GroupBy.Date + ',';
    }
    if (this.GroupBy.Materials != '') {
      _GroupBy += this.GroupBy.Materials + ',';
    }
    if (this.GroupBy.Scop != '') {
      _GroupBy += this.GroupBy.Scop + ','
    }
    if (this.GroupBy.SalesMan != '') {
      _GroupBy += this.GroupBy.SalesMan + ',';
    }

    _GroupBy = '{' + _GroupBy.slice(0, -1) + '}';


    this.applyFilters.emit({
      table_status : this.table_status,
      from: this.from,
      to: this.to,
      CompanyName: this.CompanyName,
      CategoryName: this.CategoryName,
      Group_Code: this.Group_Code,
      Material_Code: this.Material_Code,
      CityName: this.CityName,
      AreaName: this.AreaName,
      ShopName: this.ShopName,
      SalesMan: this.SalesMan,
      GroupBy: _GroupBy,
      GroupByClass: this.GroupBy
    });
    //this.panelOpen = false;
  }
  chkboxSalesMan = false;
  chkboxMaterials = false;
  chkboxScope = false;
  chkboxDate = false;
  sCityName = { name: "ALL", id: "" };
  sAreaName = { name: "ALL", id: "" };
  sShopName = { name: "ALL", id: "" };
  sSalesMan = { name: "ALL", id: "" };
  reset() {
    // window.location.replace(window.location.href);
    this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');

    this.to = _moment(new Date()).format('MM/DD/YYYY');

    this.fromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 20)));
    this.todate = new FormControl(_moment(new Date()));

    this.CompanyName = '';
    this.CategoryName = '';
    this.Group_Code = '';
    this.Material_Code = '';
    this.sCityName = { name: "ALL", id: "" };
    this.sAreaName = { name: "ALL", id: "" };
    this.sShopName = { name: "ALL", id: "" };
    this.sSalesMan = { name: "ALL", id: "" };
    this.selectCity({ name: "ALL", id: "" });
    this.DateChecked = '';
    this.ScopeChecked = '';
    this.ItemCategoryChecked = '';
    this.SalesManChecked = '';

    this.chkboxSalesMan = false;
    this.chkboxMaterials = false;
    this.chkboxScope = false;
    this.chkboxDate = false


    this.ScopeChecked = '';
    this.GroupBy.Scop = '';
    this.disabledScope = false;
    this.SalesManChecked = '';
    this.GroupBy.SalesMan = '';
    this.disabledSalesMan = false;
    this.ItemCategoryChecked = '';
    this.GroupBy.Materials = '';
    this.disabledItemCategory = false;
    this.DateChecked = '';
    this.GroupBy.Date = '';
    this.disabledDate = false;
  }
}


export interface Group {
  Scop: String;
  Materials: String;
  Date: String;
  SalesMan: String;
}
