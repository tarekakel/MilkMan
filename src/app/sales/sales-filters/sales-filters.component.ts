import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GetDataService } from '../../shared/get-data.service';
import { MatDatepickerInputEvent, MatSelect } from '@angular/material';
import { FormControl } from '@angular/forms';

import * as _moment from 'moment';


@Component({
  selector: 'app-sales-filters',
  templateUrl: './sales-filters.component.html',
  styleUrls: ['./sales-filters.component.css'],
  providers: []
})
export class SalesFiltersComponent implements OnInit, OnChanges {
  table_status = "pivot";
  panelOpen = true;
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  fromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 20)));
  todate = new FormControl(_moment(new Date()));

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
  Sales_Types = [];
  Sales_Type = "";
  Sub_Types = [];
  Sub_Type = "";

  @Output() applyFilters: EventEmitter<any> = new EventEmitter();


  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');

    this.to = _moment(new Date()).format('MM/DD/YYYY');
    let x = this;
    this.getDataService.getJson('salesfilter').subscribe(_Array => {
      x.CompanyNames = <Array<any>>_Array;
      this.getDataService.getJson('sales').subscribe(_Array => {

        let temp = [];
        temp.push({ name: 'ALL', id: '' });
        for (let index = 0; index < (<Array<any>>_Array).length; index++) {
          const element = <Array<any>>_Array[index];
          temp.push({ name: element["City"], id: element["City"] });
        }
        x.CityNames = temp;
        this.getDataService.getJson('salesMan').subscribe(_Array => {
          let __Array = <Array<any>>_Array;
          let temp = [];

          temp.push({ name: 'ALL', id: '' });
          for (let index = 0; index < __Array.length; index++) {
            const element = __Array[index];
            temp.push({ name: element["SalesMan"], id: element["SalesMan"] });
          }
          x.SalesMans = temp;
          this.getDataService.getJson("Sales/SalesType?Next=").subscribe(_Array => {
            let temp = [];
            for (let index = 0; index < (<Array<any>>_Array).length; index++) {
              const element = (<Array<any>>_Array)[index];
              if (temp.findIndex(i => i.name == element["type"]) == -1) {
                temp.push({ name: element["type"], id: element["type"] });
              }
            }
            x.Sales_Types = temp;

            this.getDataService.getJson("Sales/SalesType?Next=" + x.Sales_Type).subscribe(_Array => {
              let temp = [];
              if (x.Sales_Type != '')
                for (let index = 0; index < (<Array<any>>_Array).length; index++) {
                  const element = (<Array<any>>_Array)[index];
                  if (temp.findIndex(i => i.name == element["Invoice"]) == -1) {
                    temp.push({ name: element["Invoice"], id: element["Invoice"] });
                  }
                }
              x.Sub_Types = temp;

              x.Sub_Types = [];
              this.getDataService.getJson("Sales/SalesType?Next=SALES").subscribe(_Array => {
                let temp = [];
                for (let index = 0; index < (<Array<any>>_Array).length; index++) {
                  const element = (<Array<any>>_Array)[index];
                  if (temp.findIndex(i => i.name == element["Invoice"]) == -1) {
                    temp.push({ name: element["Invoice"], id: element["Invoice"] });
                  }
                }
                x.Sub_Types = temp;
              });
              this.apply();
            });
          });
        });
      });
    });




    x.AreaNames.push({ name: 'ALL', id: '' });
    x.ShopNames.push({ name: 'ALL', id: '' });

  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let x = this;
    this.getDataService.getJson('salesfilter').subscribe(_Array => {
      x.CompanyNames = <Array<any>>_Array;
    });
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
  InvoiceNumberChecked;
  disabledDate = false;
  disabledScope = false;
  disabledItemCategory = false;
  disabledSalesMan = false;
  disabledInvoiceNumber = false;

  GroupBy: Group = {
    Scop: '',
    Materials: '',
    Date: '',
    SalesMan: '',
    InvoiceNumber: ''
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
    } else if (this.ScopeChecked == 'Account_Name') {
      this.GroupBy.Scop = '"item2":"city" ,"item3":"area","item4":"Account_Name"';
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
    console.log(this.ItemCategoryChecked)
    if (this.ItemCategoryChecked == "VMaterial_Name") {
      this.GroupBy.Materials = '"item5":"' + this.ItemCategoryChecked + '","item6":"VMaterial_Code"';
    } else {
      this.GroupBy.Materials = '"item5":"' + this.ItemCategoryChecked + '"';
    }


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
      this.SalesManChecked = 'SalesMan';
      this.GroupBy.SalesMan = '"item7":"' + this.SalesManChecked + '"';
      this.disabledSalesMan = true;
    }
  }


  InvoiceNumberChagne() {

    this.GroupBy.InvoiceNumber = '"item8":"' + this.InvoiceNumberChecked + '"';

  }

  disableInvoiceNumber() {
    if (this.disabledInvoiceNumber) {
      this.InvoiceNumberChecked = '';
      this.GroupBy.InvoiceNumber = '';
      this.disabledInvoiceNumber = false;
    }
    else {
      this.InvoiceNumberChecked = 'invoice_number';
      this.GroupBy.InvoiceNumber = '"item8":"' + this.InvoiceNumberChecked + '"';
      this.disabledInvoiceNumber = true;
    }
  }


  selectSales_Type(value) {
    this.Sales_Type = value;
    let x = this;
    this.Sub_Types = [];
    this.getDataService.getJson("Sales/SalesType?Next=" + this.Sales_Type).subscribe(_Array => {
      let temp = [];
      if (x.Sales_Type != '')
        for (let index = 0; index < (<Array<any>>_Array).length; index++) {
          const element = (<Array<any>>_Array)[index];
          if (temp.findIndex(i => i.name == element["Invoice"]) == -1) {
            temp.push({ name: element["Invoice"], id: element["Invoice"] });
          }
        }
      x.Sub_Types = temp;
    });
  }

  selectSub_Type(value) {
    this.Sub_Type = value;
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
    if (this.GroupBy.InvoiceNumber != '') {
      _GroupBy += this.GroupBy.InvoiceNumber + ',';
    }

    _GroupBy = '{' + _GroupBy.slice(0, -1) + '}';
    console.log({
      table_status: this.table_status,
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
      Sales_Type: this.Sales_Type,
      Sub_Type: this.Sub_Type,
      GroupBy: _GroupBy,
      GroupByClass: this.GroupBy
    });

    this.applyFilters.emit({
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
      Sales_Type: this.Sales_Type,
      Sub_Type: this.Sub_Type,
      GroupBy: _GroupBy,
      GroupByClass: this.GroupBy
    });
    //this.panelOpen = false;
  }
  chkboxInvoiceNumber = false;
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
    this.Sales_Type = "";
    this.Sub_Type = "";
    this.chkboxInvoiceNumber = false;
    this.chkboxSalesMan = false;
    this.chkboxMaterials = false;
    this.chkboxScope = false;
    this.chkboxDate = false


    this.ScopeChecked = '';
    this.GroupBy.Scop = '';
    this.disabledScope = false;
    this.InvoiceNumberChecked = '';
    this.GroupBy.InvoiceNumber = '';
    this.disabledInvoiceNumber = false;
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
  InvoiceNumber: String;
}