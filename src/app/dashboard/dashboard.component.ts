import { Component, OnInit, ViewChild, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { GaugeComponent } from '@swimlane/ngx-charts';
import { GetDataService } from 'src/app/shared/get-data.service';
import { MatPaginator } from '@angular/material';
import { GetDateService } from '../shared/get-date.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // @ViewChild('mdMenuTrigger') mdMenuTrigger :any;

  //component functions------------------------
  constructor(private getDataService: GetDataService, private getDateService: GetDateService) {
    // Object.assign(this, { multi })
  }
  CompanyNames = [];
  CompanyName = "";
  CategoryNames = [];
  CategoryName = "";
  GroupNames = [];
  Group_Code = "";
  MaterialNames = [];
  Material_Code = "";
  CityNames = [];
  CityItem = { name: "ALL", id: "" };
  CityName = "";
  ShopNames = [];
  ShopName = {};
  sShopName = "";
  AreaNames = [];
  AreaItem = {};
  sAreaItem = "";
  SalesMans = [];
  SalesMan = {};
  sSalesMan = "";
  tops = 20;
  dataChange = null;
  CategoryNamesForTop = [];
  CategoryNameForTop = "";
  CityForTop = "";
  

  ngOnInit() {
    // console.log(this.mdMenuTrigger);
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
    x.getDataService.getJson('salesfilter?Param={"Company":"MilkMan"}').subscribe(_Array => {
      x.CategoryNamesForTop = <Array<any>>_Array;

      x.getDataService.getJson('salesfilter?Param={"Company":"JuiceMan"}').subscribe(_Array => {
        x.CategoryNamesForTop.push(<Array<any>>_Array[0]);
      });
    });
    this.AreaNames.push({ name: 'ALL', id: '' });
    this.AreaItem = { name: 'ALL', id: '' };
    this.ShopNames.push({ name: 'ALL', id: '' });
    this.ShopName = { name: 'ALL', id: '' };

    this.getDataService.getJson('salesMan').subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        temp.push({ name: element["SalesMan"], id: element["SalesMan"] });
      }
      x.SalesMans = temp;
      x.SalesMan = { name: 'ALL', id: '' };
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

    x.getDataService.getJson('salesfilter?Param={"Company":"' + x.CompanyName + '","materialID":"' + x.CategoryName + '","Group_Code":"' + value + '"}').subscribe(_Array => {
      x.MaterialNames = <Array<any>>_Array;
    });
  }

  selectMaterial(value) {

  }

  Sorting = 'desc'
  OrderBy = 'total_sales_amount';
  filter = 'yesterday';
  selectType(value) {

  }

  selectOrderBy(value) {
  }


  selectCity(value) {
    this.CityName = value.id;
    this.CityItem = value;
    this.AreaNames = [];
    this.AreaNames.push({ name: 'ALL', id: '' });
    this.AreaItem = { name: 'ALL', id: '' };
    this.sAreaItem = "";
    this.ShopNames = [];
    this.ShopNames.push({ name: 'ALL', id: '' });
    this.ShopName = { name: 'ALL', id: '' };
    this.sShopName = "";
    let x = this;
    x.getDataService.getJsonWithParam('sales', { next: '{"city":"' + value.id + '"}' }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < _data.length; index++) {
        const element = _data[index];
        temp.push({ name: element["area"], id: element["area"] });
      }
      x.AreaNames = temp;
    });
  }

  selectArea(value) {
    this.AreaItem = value;
    this.sAreaItem = value.id;
    this.ShopNames = [];
    this.ShopNames.push({ name: 'ALL', id: '' });
    this.ShopName = { name: 'ALL', id: '' };
    this.sShopName = "";
    let x = this;
    x.getDataService.getJsonWithParam('sales', { next: '{"city":"' + this.CityItem.id + '","area":"' + value.id + '"}' }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < _data.length; index++) {
        const element = _data[index];
        temp.push({ name: element["Account_Name"], id: element["Account_Name"] });
      }
      x.ShopNames = temp;
    });
    x.ShopName = { name: 'ALL', id: '' }
  }

  selectShopName(value) {
    this.ShopName = value;
    this.sShopName = value.id;
  }

  selectSalesMan(value) {
    this.SalesMan = value;
    this.sSalesMan = value.id;
  }
  from = this.getDateService.getDate(32)
  to = this.getDateService.getCurrentDate();

  changeValue($event) {

  }
  tab = 0;
  selectedIndexChange($event) {
    this.tab = $event;
    if (this.tab == 0) {
      this.CategoryNameForTop = '';
    }
  }

  resetFilters() {
    this.CompanyName = "";
    this.CityName = "";
    this.CityItem = { name: "ALL", id: "" };
    this.CategoryName = "";
    this.Group_Code = "";
    this.Material_Code = "";
    this.AreaNames = [];
    this.AreaNames.push({ name: 'ALL', id: '' });
    this.AreaItem = { name: 'ALL', id: '' };
    this.sAreaItem = "";
    this.ShopNames = [];
    this.ShopNames.push({ name: 'ALL', id: '' });
    this.ShopName = { name: 'ALL', id: '' };
    this.sShopName = "";
    this.SalesMan = { name: 'ALL', id: '' };
    this.sSalesMan = "";
  }

  resetFiltersTop() {
    this.Sorting = "desc";
    this.OrderBy = "total_sales_amount";
    this.filter = "yesterday";
    this.tops = 20;
    this.CityForTop = "";
    this.CategoryNameForTop = "";
  }
  tabs_visit_sales = 'sales';
  change_visit_sales(value) {
    this.tabs_visit_sales = value;
  }
}




