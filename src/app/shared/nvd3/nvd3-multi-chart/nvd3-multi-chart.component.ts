import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as _moment from 'moment';
import { OrderByPipe } from 'src/app/shared/order-by.pipe';
import { NvD3Component } from 'ng2-nvd3';
declare let d3: any;

@Component({
  selector: 'app-nvd3-multi-chart',
  templateUrl: './nvd3-multi-chart.component.html',
  styleUrls: ['./nvd3-multi-chart.component.css']
})
export class Nvd3MultiChartComponent implements OnInit, OnChanges {
  @ViewChild('chartid') chartid: NvD3Component;

  @Input()
  ChartData;

  @Input()
  xAxisLabel;

  @Input()
  xAxis;

  @Input()
  yAxisLabel;

  @Input()
  yAxis;

  @Input()
  yAxisCalculate;


  @Input()
  yAxisLine;


  @Input()
  ChangeYaxisLine;


  @Input()
  height;

  @Input()
  Color;

  @Input()
  xDomain;
  ChartOptions;

  @Input() domain;

  XmaxValue: number = 0;
  XminValue: number = 0;

  arrayMaxMin = [];


  @Input() tickValues = [];

  constructor(private orderByPipe: OrderByPipe) { }


  ngOnChanges(change) {
    this.load();
    this.XmaxValue = 0;
    this.XminValue = 0;
    for (let index = 0; index < this.ChartData.length; index++) {
      this.XmaxValue = 0;
      this.XmaxValue = 0;

    }
    if (this.chartid) {
    }
  }

  load() {
    let x = this;


    x.ChartOptions = {
      chart: {
        type: 'multiChart',
        height: 284,
        margin: {
          top: 30,
          right: 60,
          bottom: 50,
          left: 70
        },
        interpolate: 'cardinal',
        color: [
          '#d17575',
          '#75a3d1',
          '#d175a3',
          '#d1d175',
          '#d1a375',
          '#75d175',
          '#75d1d1',
          '#758cd1',
          '#d175d1',
          '#a3d175',
          '#d1ba75',
          '#8c75d1',
          '#75bad1',
          '#d18c75',
          '#ba75d1',
          '#75d1ba'
        ],
        // d3.scale.category10().range(),
        useInteractiveGuideline: true,
        duration: 500,

        xAxis: {
          // domain: x.domain
          tickFormat: function (d) {
            var dateLast = d;
            var format = d3.time.format('%Y-%m');
            var dateConvert = format(new Date(dateLast));
            return dateConvert;
          }
        },
        yAxis1: {
          tickFormat: function (d) {
            return d3.format(',')(d);
          }
        },
        yAxis2: {
          tickFormat: function (d) {
            return d3.format(',')(d);
          }
        }

        ,
        interactiveLayer: {
          tooltip: {
            contentGenerator: function (e) {
              var format = d3.time.format("%Y %b");
              var dateConvert = format(new Date(e.value));
              var temp = '<table><tr><td>Date</td><td>' + dateConvert + '</td></tr>';
              for (let index = 0; index < e.series.length; index++) {

                const element = e.series[index];
                temp += '<tr><td><span style="min-width:15px;min-height:15px;background-color:' + element.color + '"></span></td> <td>' + element.key + '</td> <td>' + (d3.format(',')(element.value)) + '</td><td></td>  </tr>';
              }
              temp += '</table>'
              return temp;
            }
          }
        }
      }
    };
    // for (let index = 0; index < this.ChartData.length; index++) {
    //   this.ChartData[index]["values"].reverse();
    // }

    //this.ChartOptions["chart"]["xAxis"]["tickValues"] = x.domain;
  }
  ngOnInit() {

  }
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}
