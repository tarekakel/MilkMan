import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { GetDataService } from '../../shared/get-data.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { OrderByPipe } from '../../shared/order-by.pipe';

@Component({
  selector: 'app-compare-sales',
  templateUrl: './compare-sales.component.html',
  styleUrls: ['./compare-sales.component.css'],
  providers: [OrderByPipe]
})
export class CompareSalesComponent implements OnInit {
  columnsDef = [];
  dataSource = [];
  lfilters: Array<filters> = [];

  panelOpenState = true;

  multi: any[] = [];

  singleAVG: any[] = [];
  singleCountShop: any[] = [];
  singleSales: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabelAVG = 'Daily Avg';
  xAxisLabelCountShop = 'Shope Count';
  xAxisLabelSales = 'Total Sales';
  showYAxisLabel = true;
  yAxisLabel = '';
  loading = false;
  colorScheme = {
    domain: ['#d17575',
      '#d1a375',
      '#d1d175',
      '#d175a3',
      '#75d175',
      '#75d1d1',
      '#758cd1',
      '#d175d1',
      '#75a3d1',
      '#a3d175',
      '#d1ba75',
      '#8c75d1',
      '#75bad1',
      '#d18c75',
      '#ba75d1',
      '#75d1ba']
  };




  constructor(private getDataService: GetDataService, private orderby: OrderByPipe) {

  }

  ngOnInit() {
    let filter = new filters(this.getDataService);
    filter.init();
    this.lfilters.push(filter);
    filter = new filters(this.getDataService);
    filter.init();
    this.lfilters.push(filter);
    this.apply();
  }



  addListFilters() {
    if (this.lfilters.length < 4) {
      let filter = new filters(this.getDataService);
      filter.init();
      this.lfilters.push(filter);
    }
  }

  removeListFilters() {
    if (this.lfilters.length > 2) {
      this.lfilters.pop();
    }
  }

  listUrls = [];
  maxGroup = [];
  buildUrls() {
    this.listUrls = [];

    let uri = '';
    for (let index = 0; index < this.lfilters.length; index++) {
      const element = this.lfilters[index];
      let durationfilter = '';
      let scopefilter = '';
      let postionfilter = '';
      let salesmanfilter = '';
      let groupby = '';

      let maxGroupT = ['', '', '', ''];
      //duration
      if (element.durationtype.id == 'day') {
        durationfilter = '&From=' + element.from + '&To=' + element.to;
        groupby = '"DateFor":"DAY"';
        let from = element.from.split('/');
        let to = element.to.split('/')
        maxGroupT[0] = from[1] + '/' +from[0] + '/'+ from[2] + ' - ' + to[1] + '/' +to[0] + '/'+ to[2];
      }
      if (element.durationtype.id == 'year') {
        let year = String(element.year.id);
        this.lfilters[index].from = '01/01/' + year;
        this.lfilters[index].to = '12/31/' + year;
        durationfilter = '&From=' + this.lfilters[index].from + '&To=' + this.lfilters[index].to;
        groupby = '"DateFor":"DAY"';
        let from = this.lfilters[index].from .split('/');
        let to = this.lfilters[index].to.to.split('/')
        maxGroupT[0] = from[1] + '/' +from[0] + '/'+ from[2] + ' - ' + to[1] + '/' +to[0] + '/'+ to[2];
      }
      if (element.durationtype.id == 'month') {
        let year = String(element.month.id).split('-')[0];
        let month = String(element.month.id).split('-')[1];
        durationfilter = '&From=' + month + '/01/' + year + '&To=' + month + '/01/' + year;
        groupby = '"DateFor":"DAY"';
        maxGroupT[0] = "DAY";
      }
      //scope
      if (element.company) {
        if (element.company.id) {
          scopefilter += '"Company":"' + element.company.id + '"';
          // groupby += ',"item1":"VCompany"';
          maxGroupT[1] = element.company.name;
        }
      }


      if (element.category) {
        if (element.category.id) {
          scopefilter += ',"materialID":"' + element.category.id + '"';
          // groupby += ',"item2":"VmaterialID"';
          maxGroupT[1] = element.category.name;
        }
      }
      if (element.group) {
        if (element.group.id) {
          scopefilter += ',"Group_Code":"' + element.group.id + '"';
          // groupby += ',"item3":"VGroup_Code"';
          maxGroupT[1] = element.group.name;
        }
      }
      if (element.material) {
        if (element.material.id) {
          scopefilter += ',"Material_Code":"' + element.material.id + '"';
          //groupby += ',"item4":"VMaterial_Code"';
          maxGroupT[1] = element.material.name;
        }
      }

      if (element.city) {
        if (element.city.id) {
          postionfilter += '"city":"' + element.city.id + '"';

          maxGroupT[2] = String(element.city.name);
        }
      }
      if (element.area) {
        if (element.area.id) {
          postionfilter += ',"area":"' + element.area.id + '"';

          maxGroupT[2] = String(element.area.name);
        }
      }
      if (element.area) {
        if (element.shop.id) {
          postionfilter += ',"Account_Name":"' + element.shop.id + '"';

          maxGroupT[2] = String(element.shop.name);
        }
      }

      groupby += ',"item5":"city"';
      groupby += ',"item6":"area"';
      groupby += ',"item7":"Account_Name"';


      if (element.salesman) {
        salesmanfilter = element.salesman.id;
        maxGroupT[3] = element.salesman.name;
      }

      uri = 'sales?Filters={' + scopefilter + '}&Filter1={' + postionfilter + '}&GroupBy={' + groupby + '}' + durationfilter + '&SalesMan=' + salesmanfilter + '&SALESTYPE=&SUBTYPE='
      this.listUrls.push(uri);
      this.maxGroup.push(maxGroupT);
    }
  }

  ListData = [];
  chartloading = true;
  ChartData = [];
  firstRun = 0;
  applyLoading = true;
  apply() {
    this.applyLoading = true;
    this.maxGroup = [];
    this.ListData = [];
    this.finalData = [];
    this.tempAVG = [];
    this.tempShopeCount = [];
    this.tempSales = [];
    this.singleCountShop = [];
    this.singleAVG = [];
    this.singleSales = [];
    this.buildUrls()

    let x = this;

    for (let index = 0; index < this.listUrls.length; index++) {
      const element = this.listUrls[index];
      this.getDataService.getJson(element).subscribe(Response => {
        let _data = <Array<any>>Response;
        x.ListData.push(_data);
        x.initChart(_data, index);

      });

    }
    if(this.firstRun != 0){
      this.panelOpenState = false;
    }
    this.firstRun = 1;
  }
  onSelect($event) {

  }

  initTable(keys) {
    this.columnsDef = [];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      let title = "";
      let format = "";
      if(element == "filter"){
          title = "Period"
      }

      if(element == "material"){
        title = "Material";
      }

      if(element == "scope"){
        title = "Scope";
      }
      if(element == "salesman"){
        title = "Sales Man"
      }

      if(element == "dailyAVG"){
        title = "Daily AVG";
        format = "number";
      }

      if(element == "totalSales"){
        title = "Total Sales .SYP";
        format = "number";
      }
      
      if(element == "totalDays"){
        title = "Days";
        format = "number";
      }
      
      if(element == "totalShope"){
        title = "Total Shop";
        format = "number";
      }
      


      this.columnsDef.push({
        def: element,
        title: title == "" ? element : title,
        format: format,
        td_style: {},
        th_style: '',
        icon: '',
        option: '',
        iconColor: '',
        icons: [{
          status: 'string',
          name: 'string',
          style: 'string'
        }]
      });
    }
  }


  finalData = [];
  tempAVG = [];
  tempShopeCount = [];
  tempSales = [];
  initChart(_data, index) {
    this.chartloading = true;

    let totalSales = 0;
    let Days = [];
    let shops = [];
    for (let j = 0; j < _data.length; j++) {
      const item = _data[j];
      totalSales += item["Total_Amount"];
      if (Days.indexOf(item["DAY"]) == -1) {
        Days.push(item["DAY"]);
      }
      if (shops.indexOf(item["Account_Name"]) == -1) {
        shops.push(item["Account_Name"]);
      }

    }
    let CountDay = Days.length;
    this.tempAVG.push({ name: 'Period(' + (index + 1) + ')', value: CountDay != 0 ? Math.round(totalSales / CountDay) : 0 });
    this.tempShopeCount.push({ name: 'Period(' + (index + 1) + ')', value: shops.length });
    this.tempSales.push({ name: 'Period(' + (index + 1) + ')', value: Math.round(totalSales) })



    this.finalData.push({
      filter: index + 1,
      Duration : this.maxGroup[index][0],
      totalDays: Days.length,
      material: this.maxGroup[index][1] == '' ? 'ALL' : this.maxGroup[index][1],
      scope: this.maxGroup[index][2] == '' ? 'ALL' : this.maxGroup[index][2],
      salesman: this.maxGroup[index][3] == '' ? 'ALL' : this.maxGroup[index][3],
      dailyAVG: CountDay != 0 ? Math.round(totalSales / CountDay) : 0,
      Variance : 0,
      totalSales: Math.round(totalSales),
      totalShope: shops.length
    });

    if (this.lfilters.length == this.finalData.length) {
      this.singleAVG = this.orderby.transform(this.tempAVG, 'name', 1);
      this.singleCountShop = this.orderby.transform(this.tempShopeCount, 'name', 1);
      this.singleSales = this.orderby.transform(this.tempSales, 'name', 1);
      this.initTable(Object.keys(this.finalData[0]));
      let tempData = this.orderby.transform(this.finalData, 'filter', 1);
      for (let index = 0; index < tempData.length; index++) {
        if(index > 0){
          tempData[index]["Variance"] = (((tempData[index]["dailyAVG"] - tempData[index - 1]["dailyAVG"]) / tempData[index - 1]["dailyAVG"])*100).toFixed(2) + ' %';
        }
      }
      this.dataSource = tempData;
      this.applyLoading = false;
    }

  }
}

class filters {
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();

  fromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 20)));
  todate = new FormControl(_moment(new Date()));

  years = [];
  months = [];
  durationtypes = [];
  companys = [];
  categorys = [];
  groups = [];
  materials = [];
  citys = [];
  areas = [];
  shops = [];
  salesmans = [];

  year: any;
  month: any;
  from: any;
  to: any;
  durationtype: any;
  company: any;
  category: any;
  group: any;
  material: any;
  city: any;
  area: any;
  shop: any;
  salesman: any;


  constructor(private getDataService: GetDataService) {

  }

  init() {
    this.initDuration();
    this.initCompanys();
    this.initCitys();
    this.initSalasman();
  }

  initDuration() {
    this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');

    this.to = _moment(new Date()).format('MM/DD/YYYY');

    //this.durationtypes.push({ name: 'month', id: 'month' });
    this.durationtypes.push({ name: 'day', id: 'day' });
    // this.durationtypes.push({ name: 'Year', id: 'year' });

    this.durationtype = { name: 'day', id: 'day' };

    for (let index = 0; index < 10; index++) {
      if (this.y - index >= 2018) {
        this.years.push({ name: this.y - index, id: this.y - index })
      }
    }
    this.year = { name: this.y, id: this.y };

    let year = 2018;
    let x = 13;
    for (let index = 0; index < 120; index++) {
      x--;
      let t = '';
      if (x < 10) {
        t = '0'
      } else {
        t = '';
      }
      if (index == 0) {
        this.month = { name: year + '-' + t + x, id: year + '-' + t + x };
      }
      this.months.push({ name: year + '-' + t + x, id: year + '-' + t + x })
      if (x == 1) {
        year--;
        x = 13;
      }
    }
  }

  selectDurationtype(value) {
    this.durationtype = value;
  }

  selectMonth(value) {
    this.month = value;
  }

  selectYear(value) {
    this.year = value;
  }

  initCompanys() {
    let x = this;
    this.getDataService.getJson('salesfilter').subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < __Array.length; index++) {
        const element = _Array[index];
        temp.push({ name: element["VCompany"], id: element["VCompany"] })
      }
      x.company = { name: 'ALL', id: '' };
      x.companys = temp;
    });

  }

  selectCompany(value) {
    this.categorys = [];
    this.category = {};
    this.groups = [];
    this.group = {};
    this.materials = [];
    this.material = {};
    this.company = value;
    let x = this;
    this.getDataService.getJsonWithParam('salesfilter', { Param: '{ "Company": "' + value.id + '" }' }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < _data.length; index++) {
        const element = _data[index];
        temp.push({ name: element["Vmaterial"], id: element["VmaterialID"] });
      }
      x.category = { name: 'ALL', id: '' };
      x.categorys = temp;
    });

  }

  selectCategory(value) {
    this.groups = [];
    this.group = null;
    this.materials = [];
    this.material = null;
    this.category = value;
    let x = this;
    this.getDataService.getJsonWithParam('salesfilter', { Param: '{ "Company": "' + this.company.id + '" ,"materialID":"' + value.id + '" }' }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < _data.length; index++) {
        const element = _data[index];
        temp.push({ name: element["Vgroup_name"], id: element["VGroup_Code"] });
      }
      x.group = { name: 'ALL', id: '' };
      x.groups = temp;
    });

  }

  selectGroup(value) {
    this.materials = [];
    this.material = null;
    this.group = value;
    let x = this;
    this.getDataService.getJsonWithParam('salesfilter', { Param: '{ "Company": "' + this.company.id + '","materialID":"' + this.category.id + '","Group_Code":"' + value.id + '"}' }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < _data.length; index++) {
        const element = _data[index];
        temp.push({ name: element["VMaterial_Name"], id: element["VMaterial_Code"] });
      }
      x.material = { name: 'ALL', id: '' };
      x.materials = temp;
    });

  }

  selectMaterial(value) {
    this.material = value;
  }


  initCitys() {
    let x = this;
    this.getDataService.getJson('sales').subscribe(_Array => {
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = <Array<any>>_Array[index];
        temp.push({ name: element["City"], id: element["City"] });
      }
      x.city = { name: 'ALL', id: '' };
      x.citys = temp;
    });

  }


  selectCity(value) {
    this.city = value;
    this.areas = [];
    this.area = {};
    this.shops = [];
    this.shop = {};
    let x = this;
    x.getDataService.getJsonWithParam('sales', { next: '{"city":"' + value.id + '"}' }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < _data.length; index++) {
        const element = _data[index];
        temp.push({ name: element["area"], id: element["area"] });
      }
      x.area = { name: 'ALL', id: '' };
      x.areas = temp;
    });
  }

  selectArea(value) {
    this.area = value;
    this.shops = [];
    this.shop = {};
    let x = this;
    x.getDataService.getJsonWithParam('sales', { next: '{"city":"' + this.city.id + '","area":"' + value.id + '"}' }).subscribe(Response => {
      let _data = <Array<any>>Response.body;

      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < _data.length; index++) {
        const element = _data[index];
        temp.push({ name: element["Account_Name"], id: element["Account_Name"] });
      }
      x.shop = { name: 'ALL', id: '' };
      x.shops = temp;
    });

  }

  selectShop(value) {
    this.shop = value;
  }

  initSalasman() {
    let x = this;
    this.getDataService.getJson('salesMan').subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        temp.push({ name: element["SalesMan"], id: element["SalesMan"] });
      }
      x.salesman = { name: 'ALL', id: '' };
      x.salesmans = temp;
    });
  }
  selectSalesman(value) {
    this.salesman = value;
  }


  ChangeFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.from = _moment(event.value).format('MM/DD/YYYY');
  }

  ChangeTo(type: string, event: MatDatepickerInputEvent<Date>) {
    this.to = _moment(event.value).format('MM/DD/YYYY');
  }

}