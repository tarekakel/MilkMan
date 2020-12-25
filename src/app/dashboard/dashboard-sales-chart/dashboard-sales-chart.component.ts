import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';
import { GaugeComponent } from '@swimlane/ngx-charts';
import { GetDataService } from '../../shared/get-data.service';
import { GetDateService } from '../../shared/get-date.service';
import { OrderByPipe } from '../../shared/order-by.pipe';
import * as shape from 'd3-shape';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import * as svg from 'save-svg-as-png';

@Component({
  selector: 'app-dashboard-sales-chart',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '390px',
        width: '500px',
        background: 'rgba(220, 224, 232,0.96)',
        borderRadius: '5px'
      })),
      state('closed', style({
        height: '30px',
        width: '50px',
        background: 'rgba(220, 224, 232,0.0)'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('1s')
      ]),
      transition('open <=> closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('1s',
          style({ opacity: '*' }),
        ),
      ]),
      transition('* => *', [
        animate('1s')
      ]),
    ]),
  ],
  templateUrl: './dashboard-sales-chart.component.html',
  styleUrls: ['./dashboard-sales-chart.component.css']
})
export class DashboardSalesChartComponent implements OnInit, OnChanges {

  @Input() from;
  @Input() to;
  @Input() company_name;
  @Input() category_name;
  @Input() group_code;
  @Input() material_code;
  @Input() city;

  //gauge chart prop--------------------------
  PieChartDate;
  view: any[] = [250, 300];
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
  constructor(private getDataService: GetDataService, private getDateService: GetDateService, private orderBy: OrderByPipe) {

  }
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  ngOnInit() {
    let x = this;
    this.PieChartDate = this.getDateService.getDate(1);
    this.getDataService.getJson('dashboard?actDate=' + this.getDateService.getDate(1)).subscribe(_Array => {
      let temp = [];
      let totaleSales = 0;
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = (<Array<any>>_Array)[index];
        totaleSales += element.TotalSalesAmount;
      }
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = (<Array<any>>_Array)[index];

        temp.push({
          "name": element.material,
          "value": (element.TotalSalesAmount / totaleSales * 100).toFixed(2)
        });

      }
      
      x.PieChartData = temp;
    });
  }

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

  onSelect(event) {
   
    let x = this;
    this.isOpen = true;
    let temp = event.name.split('/')[1] + '/' + event.name.split('/')[0] + '/' + event.name.split('/')[2];
    this.PieChartDate = event.name;
    this.getDataService.getJson('dashboard?actDate=' + temp).subscribe(_Array => {
      let temp = [];
      let totaleSales = 0;
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = (<Array<any>>_Array)[index];
        totaleSales += element.TotalSalesAmount;
      }
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = (<Array<any>>_Array)[index];

        temp.push({
          "name": element.material,
          "value": (element.TotalSalesAmount / totaleSales * 100).toFixed(2)
        });

      }
      x.PieChartData = temp;
    });
  }


  ngOnChanges(changes: SimpleChanges) {

    let uri = '';
    if (this.company_name != '') {
      uri += '"Company":"' + this.company_name + '",';
    }

    if (this.category_name != '') {
      uri += '"materialID":"' + this.category_name + '",';
    }

    if (this.group_code != '') {
      uri += '"Group_Code":"' + this.group_code + '",';
    }

    if (this.material_code != '') {
      uri += '"Material_Code":"' + this.material_code + '",';
    }

    uri = 'dashboard?Param={' + uri.slice(0, -1) + '}&From=' + this.from + '&To=' + this.to + '&city=' + this.city;

    let x = this;
    this.ChartLoading = true;
    this.noData = true;
    this.getDataService.getJson(uri).subscribe(_Array => {
      x.ELEMENT_DATA = [];


      let temp = [];
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = (<Array<any>>_Array)[index];
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
      x.ChartLoading = false;
      
      if (x.ELEMENT_DATA.length == 0) {
        x.noData = true;
      } else {
        x.noData = false;
      }
    });
  }



  //Pie Chart
  PieChartData = [];
  // pieview: any[] = [700, 400];

  // options
  pieshowLegend = false;



  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = true;

  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;

  }

  @Input() logging = false;
  onAnimationEvent(event: AnimationEvent) {

    if (this.isOpen) {

      this.PieChartData = [... this.PieChartData];
    }
  }
  tooltipText(data) {
  }

  onRightClick($event) {
    return false;
  }

  PieonSelect(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    return false;
  }
}




export class sales_daily_chart {
  act_date: Date;
  act_dateStr: string;
  Total_sales_Amount: number;
  Total_sales_count: number;
  Gift_Cost: number;
  Gift_Count: number;
  statu: string;
}