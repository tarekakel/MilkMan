import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { MatDatepickerInputEvent } from '@angular/material';
import { GetDataService } from '../shared/get-data.service';
import * as shape from 'd3-shape';
import { OrderByPipe } from '../shared/order-by.pipe';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-sales-hierarchy',
  templateUrl: './sales-hierarchy.component.html',
  styleUrls: ['./sales-hierarchy.component.css']
})
export class SalesHierarchyComponent implements OnInit {
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  listMoth = [];
  fromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 20)));
  todate = new FormControl(_moment(new Date()));

  from;
  to;
  data;
  GroupDate;
  xAxisFormat;
  xAxisLabel;
  MonthFrom;
  MonthTo;
  constructor(private getDataService: GetDataService, private orderByPipe: OrderByPipe, private orderpipe: OrderPipe) { }

  ngOnInit() {
    this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');
    this.to = _moment(new Date()).format('MM/DD/YYYY');
    this.items = [{ name: "MilkMan", id: "MilkMan" }, { name: "JuiceMan", id: "JuiceMan" }];
    this.GroupDate = 'DAY';
    this.xAxisFormat = 'Day';
    this.xAxisLabel = 'Day';
    this.LoadChart(0);
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
      this.listMoth.push({ name: year + '-' + t + x, id: year + '-' + t + x })
      if (x == 1) {
        year--;
        x = 13;
      }
    }
  }

  ChangeFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.from = _moment(event.value).format('MM/DD/YYYY');
    this.LoadChart(0);
  }

  ChangeTo(type: string, event: MatDatepickerInputEvent<Date>) {
    this.to = _moment(event.value).format('MM/DD/YYYY');
    this.LoadChart(0);
  }
  selectGroup(value) {
    this.GroupDate = value;
    if (value == 'DAY') {
      this.xAxisFormat = 'Day';
      this.xAxisLabel = 'Day';
      this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');
      this.to = _moment(new Date()).format('MM/DD/YYYY');
    } else if (value == 'MONTH') {
      this.xAxisFormat = 'Month';
      this.xAxisLabel = 'Month';
      this.from = _moment(new Date(this.y, 0, 1)).format('MM/DD/YYYY');
      this.to = _moment(new Date()).format('MM/DD/YYYY');
      let Mfrom = this.y + '-01';
      let Mto = this.y + '-' + (((this.m + 1) < 10) ? ('0' + '' + String(this.m + 1)) : this.m + 1);
      this.MonthFrom = { name: Mfrom, id: Mfrom };
      this.MonthTo = { name: Mto, id: Mto };
    }
    this.LoadChart(0);
  }

  loading = false;
  selected_items = [];

  items = [];

  click(item) {
    let x = this;
    if (this.selected_items.length == 4) {
      this.selected_items.pop();
    }
    this.selected_items.push(item);

    if (this.selected_items.length > 0) {
      if (this.selected_items.length == 1) {
        this.items = [{ name: "City", id: "city" }, { name: "Category", id: "Vmaterial" }, { name: "SalesMan", id: "SalesMan" }];
        this.loading = true;
      }
      if (this.selected_items.length == 2) {

        this.items = [];
        this.loading = false;
        if (this.selected_items[x.selected_items.length - 1].id == "Vmaterial") {
          x.getDataService.getJson('salesfilter?Param={"Company":"' + x.selected_items[x.selected_items.length - 2].id + '"}').subscribe(_Array => {
            let temp = [];
            for (let index = 0; index < (<Array<any>>_Array).length; index++) {
              const element = (<Array<any>>_Array)[index];
              temp.push({ name: element["Vmaterial"], id: element["VmaterialID"] });
            }
            x.items = temp;
            this.loading = true;
          });
        }

        if (this.selected_items[x.selected_items.length - 1].id == "city") {
          this.getDataService.getJson('sales').subscribe(_Array => {
            let temp = [];
            this.loading = false;
            for (let index = 0; index < (<Array<any>>_Array).length; index++) {
              const element = <Array<any>>_Array[index];
              temp.push({ name: element["City"], id: element["City"] });
            }
            x.items = temp;
            this.loading = true;
          });
        }

        if (this.selected_items[x.selected_items.length - 1].id == "SalesMan") {
          this.getDataService.getJson('sales').subscribe(_Array => {
            let temp = [];
            this.loading = false;
            for (let index = 0; index < (<Array<any>>_Array).length; index++) {
              const element = <Array<any>>_Array[index];
              temp.push({ name: element["City"], id: element["City"] });
            }
            x.items = temp;
            this.loading = true;
          });
        }
      }
      if (this.selected_items.length == 3) {
        this.items = [];
        if (this.selected_items[x.selected_items.length - 2].id == "Vmaterial") {
          x.getDataService.getJson('salesfilter?Param={"Company":"' + x.selected_items[x.selected_items.length - 3].id + '","materialID":"' + item.id + '"}').subscribe(_Array => {
            let temp = [];
            this.loading = false;
            let __Array = <Array<any>>_Array;

            for (let index = 0; index < __Array.length; index++) {
              const element = __Array[index];
              temp.push({ name: element["Vgroup_name"], id: element["VGroup_Code"] });
            }
            x.items = temp;
            this.loading = true;
          });
        }

        if (this.selected_items[x.selected_items.length - 2].id == "city") {
          x.getDataService.getJson('sales?next={"city":"' + x.selected_items[x.selected_items.length - 1].id + '"}').subscribe(_Array => {
            let temp = [];
            this.loading = false;
            for (let index = 0; index < (<Array<any>>_Array).length; index++) {
              const element = <Array<any>>_Array[index];
              temp.push({ name: element["area"], id: element["area"] });
            }
            x.items = temp;
            this.loading = true;
          });
        }
        if (this.selected_items[x.selected_items.length - 2].id == "SalesMan") {
          x.getDataService.getJson('sales?next={"city":"' + x.selected_items[x.selected_items.length - 1].id + '"}').subscribe(_Array => {
            let temp = [];
            this.loading = false;
            for (let index = 0; index < (<Array<any>>_Array).length; index++) {
              const element = <Array<any>>_Array[index];
              temp.push({ name: element["area"], id: element["area"] });
            }
            x.items = temp;
            this.loading = true;
          });
        }
      }


    }
    this.LoadChart(0);
  }

  clickBack() {
    let x = this;
    this.selected_items.pop();
    if (this.selected_items.length == 0) {
      this.items = [{ name: "MilkMan", id: "MilkMan" }, { name: "JuiceMan", id: "JuiceMan" }];
    }

    if (this.selected_items.length == 1) {
      this.items = [{ name: "City", id: "city" }, { name: "Category", id: "Vmaterial" }, { name: "SalesMan", id: "SalesMan" }];
      this.loading = true;
    }

    if (this.selected_items.length == 2) {
      this.items = [];
      this.loading = false;
      if (this.selected_items[x.selected_items.length - 1].id == "Vmaterial") {
        x.getDataService.getJson('salesfilter?Param={"Company":"' + x.selected_items[x.selected_items.length - 2].id + '"}').subscribe(_Array => {
          let temp = [];
          for (let index = 0; index < (<Array<any>>_Array).length; index++) {
            const element = (<Array<any>>_Array)[index];
            temp.push({ name: element["Vmaterial"], id: element["VmaterialID"] });
          }
          x.items = temp;
          this.loading = true;
        });
      }
      if (this.selected_items[x.selected_items.length - 1].id == "city") {
        this.getDataService.getJson('sales').subscribe(_Array => {
          let temp = [];
          this.loading = false;
          for (let index = 0; index < (<Array<any>>_Array).length; index++) {
            const element = <Array<any>>_Array[index];
            temp.push({ name: element["City"], id: element["City"] });
          }
          x.items = temp;
          this.loading = true;
        });
      }
      if (this.selected_items[x.selected_items.length - 1].id == "SalesMan") {
        this.getDataService.getJson('sales').subscribe(_Array => {
          let temp = [];
          this.loading = false;
          for (let index = 0; index < (<Array<any>>_Array).length; index++) {
            const element = <Array<any>>_Array[index];
            temp.push({ name: element["City"], id: element["City"] });
          }
          x.items = temp;
          this.loading = true;
        });
      }
    }

    if (this.selected_items.length == 3) {
      if (this.selected_items[x.selected_items.length - 2].id == "SalesMan") {
        x.getDataService.getJson('sales?next={"city":"' + x.selected_items[x.selected_items.length - 1].id + '"}').subscribe(_Array => {
          let temp = [];
          this.loading = false;
          for (let index = 0; index < (<Array<any>>_Array).length; index++) {
            const element = <Array<any>>_Array[index];
            temp.push({ name: element["area"], id: element["area"] });
          }
          x.items = temp;
          this.loading = true;
        });
      }
    }
    this.LoadChart(0);
  }


  LoadChart(x) {
    let uri = "";
    let groupBy = "";
    if (this.selected_items.length == 0) {
      uri = 'sales?Filters={}&Filter1={}&GroupBy={"DateFor":"' + this.GroupDate + '","item":"VCompany"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
      groupBy = "VCompany";
    }

    if (this.selected_items.length == 1) {
      uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '"}&Filter1={}&GroupBy={"DateFor":"' + this.GroupDate + '","item":"VCompany"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
      groupBy = 'VCompany';
    }

    if (this.selected_items.length == 2) {
      if (this.selected_items[1].id == 'Vmaterial') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '"}&Filter1={}&GroupBy={"DateFor":"' + this.GroupDate + '","item5":"Vmaterial"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
        groupBy = "Vmaterial";
      }
      if (this.selected_items[1].id == 'city') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '"}&Filter1={}&GroupBy={"DateFor":"' + this.GroupDate + '","item2":"city" }&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
        groupBy = "city";
      }
      if (this.selected_items[1].id == 'SalesMan') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '"}&Filter1={}&GroupBy={"DateFor":"' + this.GroupDate + '","item2":"SalesMan" }&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
        groupBy = "SalesMan";
      }
    }

    if (this.selected_items.length == 3) {
      if (this.selected_items[1].id == 'Vmaterial') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '","materialID":"' + this.selected_items[2].id + '"}&Filter1={}&GroupBy={"DateFor":"' + this.GroupDate + '","item5":"Vgroup_name"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
        groupBy = "Vgroup_name";
      }
      else if (this.selected_items[1].id == 'city') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '"}&Filter1={"city":"' + this.selected_items[2].id + '"}&GroupBy={"DateFor":"' + this.GroupDate + '","item2":"city" ,"item3":"area"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
        groupBy = "area";
      }
      if (this.selected_items[1].id == 'SalesMan') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '"}&Filter1={"city":"' + this.selected_items[2].id + '"}&GroupBy={"DateFor":"' + this.GroupDate + '","item2":"SalesMan" }&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
        groupBy = "SalesMan";
      }
    }

    if (this.selected_items.length == 4) {
      if (this.selected_items[1].id == 'Vmaterial') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '","materialID":"' + this.selected_items[2].id + '","Group_Code":"' + this.selected_items[3].id + '"}&Filter1={}&GroupBy={"DateFor":"' + this.GroupDate + '","item5":"VMaterial_Name"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
        groupBy = "VMaterial_Name";
      }
      if (this.selected_items[1].id == 'city') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '"}&Filter1={"city":"' + this.selected_items[2].id + '","area":"' + this.selected_items[3].id + '"}&GroupBy={"DateFor":"DAY","item2":"city" ,"item3":"area","item4":"Account_Name"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE='
        groupBy = "Account_Name";
      }
      if (this.selected_items[1].id == 'SalesMan') {
        uri = 'sales?Filters={"Company":"' + this.selected_items[0].id + '"}&Filter1={"city":"' + this.selected_items[2].id + '","area":"' + this.selected_items[3].id + '"}&GroupBy={"DateFor":"' + this.GroupDate + '","item2":"SalesMan" }&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
        groupBy = "SalesMan";
      }
    }
    this.InitData(uri, groupBy);
  }

  ChartData = [];
  chartloading = false;


  initArray(__array,keys, Dates,groupBy) {
    let _array = [];
    for (let i = 0; i < Dates.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        let obj = {};
        obj[this.GroupDate] = Dates[i];
        obj["Gift_Cost"] = 0;
        obj["Gift_Count"] = 0;
        obj["Total_Amount"] = 0;
        obj["Total_count"] = 0;
        obj[groupBy] = keys[j];

        _array.push(obj);

      }
    }
    for (let index = 0; index < __array.length; index++) {
      const element = __array[index];
      let ind = 0;
      for (let j = 0; j < _array.length; j++) {
        const _element = _array[j];
        if(element[groupBy] == _element[groupBy] && element[this.GroupDate] == _element[this.GroupDate]){
          _array[j]["Gift_Cost"] = __array[index]["Gift_Cost"];
          _array[j]["Gift_Count"] = __array[index]["Gift_Count"];
          _array[j]["Total_Amount"] = __array[index]["Total_Amount"];
          _array[j]["Total_count"] = __array[index]["Total_count"];
        }
      }
    }
    return _array;
  }

  InitData(uri, groupBy) {
    let x = this;
    this.chartloading = true;
    this.getDataService.getJson(uri).subscribe(_Array => {
      let __Array = <Array<any>>_Array;

      let keys = [];
      let Dates = [];
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        if (keys.findIndex(i => i == element[groupBy]) == -1) {
          keys.push(element[groupBy]);
        }
        if (this.GroupDate == "DAY") {
          if (Dates.findIndex(i => i == element["DAY"]) == -1) {
            Dates.push(element["DAY"])
          }
        } else {
          if (Dates.findIndex(i => i == element["MONTH"]) == -1) {
            Dates.push(element["MONTH"])
          }
        }
      }
      let tArray = this.initArray(__Array,keys, Dates,groupBy);
      let temp = [];
      for (let index = 0; index < tArray.length; index++) {

        const element = tArray[index];

        let tcindex = temp.findIndex(i => i.key == element[groupBy])
        // debugger;

        let date;

        if (this.GroupDate == "DAY") {
          date = new Date((<string>element['DAY']).split('/')[2] + '-' + (<string>element["DAY"]).split('/')[1] + '-' + (<string>element["DAY"]).split('/')[0]);
        } else {
          date = new Date((<string>element["MONTH"]).split('-')[0] + '-' + (<string>element["MONTH"]).split('-')[1] + '-01');
        }
        //debugger;
        if (tcindex == -1) {
          temp.push({
            values: [{ x: date, y: Math.round(element["Total_Amount"]) }],      //values - represents the array of {x,y} data points
            key: element[groupBy]
          });
        } else {

          temp[tcindex]["values"].push({ x: date, y: Math.round(element["Total_Amount"]) });
        }

      }
      this.ChartData = temp;
      this.chartloading = false;
    });


  }

  selectMonthFrom(value) {
    this.from = value.id.split('-')[1] + '/01/' + value.id.split('-')[0];
    this.LoadChart(0);
  }


  selectMonthTo(value) {
    this.to = value.id.split('-')[1] + '/01/' + value.id.split('-')[0];
    this.LoadChart(0);
  }


}
