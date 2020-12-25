import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';
import * as shape from 'd3-shape';
import { DatePipe } from '@angular/common';
import { OrderByPipe } from '../../shared/order-by.pipe';
import * as _moment from 'moment';

@Component({
  selector: 'app-dashbord-visit-chart',
  templateUrl: './dashbord-visit-chart.component.html',
  styleUrls: ['./dashbord-visit-chart.component.css'],
  providers: [DatePipe]
})
export class DashbordVisitChartComponent implements OnInit {

  colorScheme = {
    domain: [
      '#d17575',
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
      '#75d1ba'
    ]
  };

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


  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Visits';

  // curve :any= shape.curveLinear;
  curve: any = shape.curveCatmullRom.alpha(0.5);

  // line, area
  autoScale = true;
  noData = false;
  loading = true;
  data = [];

  constructor(private getDataService: GetDataService, private datePipe: DatePipe,private orderByPipe:OrderByPipe) { }

  ngOnInit() {
  }

  ngOnChanges() {
    let x = this;
    let uri = 'visit?Filters={}&Filter1={';
    if (this.city != '') {
      uri += '"city":"' + this.city + '"';
    }
    if (this.area != '') {
      uri += ',"area":"' + this.area + '"';
    }
    if (this.shopname != '') {
      uri += ',"cuCustomerName":"' + this.shopname + '"';
    }


    this.to = _moment(new Date(this.y, this.m, this.d)).format('MM/DD/YYYY');
    if (this.tab == 'MONTH') {
      this.from = _moment(new Date(this.y, this.m, this.d - 365)).format('MM/DD/YYYY');
      uri += '}&GroupBy={"DateFor":"' + this.tab + '"}&From=' + this.y + '&To=' + this.to + '&SalesMan=' + this.salesman;
    } else {
      this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');
      uri += '}&GroupBy={"DateFor":"' + this.tab + '"}&From=' + this.from + '&To=' + this.to + '&SalesMan=' + this.salesman;
    }


    this.loading = true;
    this.noData = false;
    this.data = [];
    
    this.getDataService.getJson(uri).subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      if (__Array.length != 0) {
        let keys = Object.keys(__Array[0]);
        let temp = [];

        for (let index = 0; index < keys.length; index++) {
          const element = keys[index];
          if (element.indexOf("المدة الزمنية") == -1) {
            if (element != 'MONTH' && element != 'DAY') {
              if(element.indexOf("زيار") != -1)
              temp.push({ name: element, series: [] });
            }
          }
        }

        for (let index = __Array.length - 1; index >= 0; index--) {
          const element = __Array[index];
          for (let j = 0; j < temp.length; j++) {
            let tdate = "";
            if (this.tab == 'DAY') {
              tdate = this.datePipe.transform(__Array[index][this.tab], 'yyyy-MM-dd');
            }
            if (this.tab == 'MONTH') {
              tdate = this.datePipe.transform(__Array[index][this.tab] + '-01', 'yyyy-MM-dd');
            }
            if (__Array[index][temp[j].name]) {
              temp[j].series.push({ name: tdate, value: __Array[index][temp[j].name] });
            } else {
              temp[j].series.push({ name: tdate, value: 0 });
            }
          }
        }

        
        for (let index = 0; index < temp.length; index++) {
          temp[index].series = this.orderByPipe.transform(temp[index].series,'name',1);
          for (let j = 0; j < temp[index].series.length; j++) {
            if (this.tab == 'DAY') {
             temp[index].series[j].name = this.datePipe.transform(temp[index].series[j].name,'EE d, MMM yy');
            }else{
              temp[index].series[j].name = this.datePipe.transform(temp[index].series[j].name,'MMM-yy');
            }
          }
        }
        console.log(temp);


        this.data = temp;
      }
      else {
        x.noData = true;
      }
      x.loading = false;
    });
  }

  onSelect(event) {

  }
}
