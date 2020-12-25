import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { GaugeComponent } from '@swimlane/ngx-charts';
import { GetDataService } from '../../shared/get-data.service';
import * as shape from 'd3-shape';
import { OrderByPipe } from '../../shared/order-by.pipe';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-dashboard-month-sales-chart',
  templateUrl: './dashboard-month-sales-chart.component.html',
  styleUrls: ['./dashboard-month-sales-chart.component.css']
})
export class DashboardMonthSalesChartComponent implements OnInit, OnChanges {
  @Input() company_name;
  @Input() category_name;
  @Input() group_code;
  @Input() material_code;
  @Input() city;
  //gauge chart prop--------------------------
  @ViewChild('gauge_chart') gauge_chart: GaugeComponent;

  view: any[] = [250, 300];
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
  constructor(private getDataService: GetDataService, private order: OrderPipe) { }
  ngOnInit() {

  }
  domain = [];
  data;
  tickValues = [];
  ngOnChanges() {
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

    if (uri != '') {
      uri = '?Param={' + uri.slice(0, -1) + '}&city=' + this.city;
    }
    else {
      uri = '?city=' + this.city;
    }
    let x = this;
    this.ChartLoading = true;
    this.noData = true;


    this.getDataService.getJson('dashboard' + uri).subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      __Array = this.order.transform(__Array, 'act_month', false, false, this.customComparator);
      
      let sale_temp = [];
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        sale_temp.push({ "x": new Date((<string>element["act_month"]).split('-')[1] + '-' + (<string>element["act_month"]).split('-')[0] + '-01'), "y": element["Total_sales_Amount"] });
        x.domain.push(element["act_month"]);
      }

      x.getDataService.getJson('dashboard/AVG' + uri).subscribe(_Array => {
        let ___Array = <Array<any>>_Array;
        ___Array = this.order.transform(___Array, 'act_month', false, false, this.customComparator);
        console.log(___Array);
        let avg_temp = [];
        for (let index = 0; index < ___Array.length; index++) {
          const element = ___Array[index];
          avg_temp.push({ "x": new Date((<string>element["act_month"]).split('-')[1] + '-' + (<string>element["act_month"]).split('-')[0] + '-01'), "y": Math.round(element["Daily_avg"]) });
        }



        x.data = [{
          "key": "Sales",
          "type": "line",
          "values": sale_temp,
          "yAxis": 1,
          interpolate: 'step-after'
        }, {
          "key": "Avg Sales",
          "type": "line",
          "values": avg_temp,
          "yAxis": 2,
          interpolate: 'step-after'
        }];
        console.log(x.data);
        x.ChartLoading = false;
        if (avg_temp.length == 0) {
          x.noData = true;
        } else {
          x.noData = false;
          x.chartType = 'combo-chart';
        }
      });
    });


  }
  chartType;
  lineChartScheme = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal',
    domain: ['#01579b', '#7aa3e5', '#a8385d', '#00bfa5']
  };

  comboBarScheme = {
    name: 'singleLightBlue',
    selectable: true,
    group: 'Ordinal',
    domain: ['#01579b']
  };

  showRightYAxisLabel: boolean = true;
  yAxisLabelRight: string = 'Utilization';

  //---------
  ELEMENT_DATA: any[];

  salesAmountData = [];
  avgSaels = [];
  ChartLoading = true;
  noData = true;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Sales Amount';
  curve: any = shape.curveCatmullRom.alpha(0.5);

  // line, area
  autoScale = true;

  onSelect(event) {

  }

  customComparator(itemA, itemB) {
    if(Number(itemA.split('-')[1]) == Number(itemB.split('-')[1])){
      return Number(itemA.split('-')[0]) > Number(itemB.split('-')[0]) ? 1 : -1;
    }
    else{
      return Number(itemA.split('-')[1]) > Number(itemB.split('-')[1]) ? 1 : -1;
    }
     
  }
}
