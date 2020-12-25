import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { GetDataService } from '../../../shared/get-data.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderByPipe } from '../../../shared/order-by.pipe';
import * as _moment from 'moment';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-dashboard-dialog-card',
  templateUrl: './dashboard-dialog-card.component.html',
  styleUrls: ['./dashboard-dialog-card.component.css']
})
export class DashboardDialogCardComponent implements OnInit {
  dyWH = [900, 0];
  title;
  loading = false;
  constructor(private getDataService: GetDataService,
    public dialogRef: MatDialogRef<DashboardDialogCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CardDialogData, private orderBy: OrderByPipe) {
    this.cardDays = Number(this.data.day);
  }
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  from;
  to;
  ChartData = [];
  AvgData = [];
  counto = [];
  cardDays = 1;

  ELEMENT_DATA: any[];
  ChartLoading = true;
  noData = true;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Sales Amount';
  // curve :any= shape.curveLinear;
  curve: any = shape.curveCatmullRom.alpha(0.5);

  // line, area
  autoScale = true;



  ngOnInit() {
    console.log(window.innerWidth);
    if (window.innerWidth > 1144) {
      this.dyWH = [(window.innerWidth / 1.7) - 100, 0]
    } else if (window.innerWidth <= 1144 && window.innerWidth > 989) {
      this.dyWH = [window.innerWidth - 300, 0];
    } else if (window.innerWidth <= 989) {
      this.dyWH = [window.innerWidth - 240, 0]
    }
    this.loading = true;
    let x = this;
    this.from = _moment(new Date(this.y, this.m, (this.d - 30))).format('MM/DD/YYYY');
    this.to = _moment(new Date()).format('MM/DD/YYYY');
    let company = 'MilkMan';
    if (this.data.material.VmaterialID == "C0102") {
      company = 'JuiceMan';
    }
    let uri = '';
    if (this.data.material.VmaterialID == "C0104") {
      uri = 'sales?Filters={"Company":"' + company + '","materialID":"' + this.data.material["VmaterialID"] + '"}&Filter1={}&GroupBy={"item5":"VMaterial_Name"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
    } else if (this.data.material.VmaterialID == "C0105") {
      uri = 'sales?Filters={"Company":"' + company + '","materialID":"' + this.data.material["VmaterialID"] + '"}&Filter1={}&GroupBy={"item5":"VMaterial_Name"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
    } else if (this.data.material.VmaterialID == "C0106") {
      uri = 'sales?Filters={"Company":"' + company + '","materialID":"' + this.data.material["VmaterialID"] + '"}&Filter1={}&GroupBy={"item5":"VMaterial_Name"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
    } else {
      uri = 'sales?Filters={"Company":"' + company + '","materialID":"' + this.data.material["VmaterialID"] + '"}&Filter1={}&GroupBy={"item5":"Vgroup_name"}&From=' + this.from + '&To=' + this.to + '&SalesMan=&SALESTYPE=SALES&SUBTYPE=';
    }

    this.getDataService.getJson(uri).subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      let temp = [];
      let total = 0;
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        total += element["Total_Amount"];
      }
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        if (this.data.material.VmaterialID == 'C0104' || this.data.material.VmaterialID == 'C0105' || this.data.material.VmaterialID == 'C0106') {
          temp.push({ key: element["VMaterial_Name"], y: element["Total_Amount"], disabled: false });
        } else {
          temp.push({ key: element["Vgroup_name"], y: element["Total_Amount"], disabled: false });
        }

      }
      x.ChartData = temp;


      x.getDataService.getJson('dashboard?Param={"Company":"' + company + '","materialID":"' + this.data.material["VmaterialID"] + '"}&From=' + this.from + '&To=' + this.to + '&city=').subscribe(Data => {
        let _data = <Array<any>>Data;

        let temp = [];
        for (let index = 0; index < _data.length; index++) {
          const element = _data[index];
          temp.push({ "name": element["act_date"], "value": element["Total_sales_Amount"] });
        }
        temp = this.orderBy.transform(temp, 'name', 1);
        for (let index = 0; index < temp.length; index++) {
          const element = temp[index];
          temp[index] = { "name": _moment(element["name"]).format('ddd DD, MMM YYYY'), "value": element["value"] };
        }

        x.ELEMENT_DATA = [{
          "name": "Sales Amount",
          "series": temp
        }];

      });


      x.getDataService.getJsonWithParam('dashboard', { last: (Number(x.data.day) + 1), Group: x.data.material["VmaterialID"] }).subscribe(Response => {
        let __Array = <Array<any>>Response.body;
        let temp = [];
        for (let index = 0; index < __Array.length; index++) {
          const element = __Array[index];
          temp.push(element);
        }
        x.AvgData = temp;
        x.loading = false;
      });
    });


  }

  onSearchChange(value) {
    let x = this;
    x.getDataService.getJsonWithParam('dashboard', { last: (Number(value) + 1), Group: x.data.material["VmaterialID"] }).subscribe(Response => {
      let __Array = <Array<any>>Response.body;
      let temp = [];
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        temp.push(element);
      }
      x.AvgData = temp;


      x.loading = false;
    });
  }

  onCountoEnd() {

  }

  countoChange($event, i) {
    this.counto[i] = Math.round($event);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(window.innerWidth);

    if (window.innerWidth > 1144) {
      this.dyWH = [(window.innerWidth / 1.7) - 100, 0]
    } else if (window.innerWidth <= 1144 && window.innerWidth > 989) {
      this.dyWH = [window.innerWidth - 300, 0];
    } else if (window.innerWidth <= 989) {
      this.dyWH = [window.innerWidth - 240, 0]
    }
  }


  colorScheme = {
    domain: ['#a3d175',
      '#d1ba75',
      '#8c75d1',
      '#d175d1',
      '#d18c75',
      '#ba75d1',
      '#d17575',
      '#d1a375',
      '#d1d175',
      '#d175a3',
      '#75d175',
      '#75d1d1',
      '#75bad1',
      '#758cd1',
      '#75a3d1',
      '#75d1ba']
  };
}

export class CardDialogData {
  material: any;
  day: Number;
}