import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OrderByPipe } from 'src/app/shared/order-by.pipe';

@Component({
  selector: 'app-nvd3-line-chart',
  templateUrl: './nvd3-line-chart.component.html',
  styleUrls: ['./nvd3-line-chart.component.css']
})
export class Nvd3LineChartComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() options;
  @Input() xAxisFormat;
  @Input() xAxisLabel;

  constructor(private orderByPipe: OrderByPipe) { }

  ngOnChanges() {



    let x = this;
    this.options = {
      chart: {
        type: 'lineChart',
        height: 350,
        margin: {
          top: 20,
          right: 55,
          bottom: 40,
          left: 100
        },
        x: function (d) { return d.x; },
        y: function (d) { return d.y; },
        useInteractiveGuideline: true,
        interpolate: 'cardinal',
        duration: 500,
        dispatch: {
          stateChange: function (e) { },
          changeState: function (e) { },
          tooltipShow: function (e) { },
          tooltipHide: function (e) { }
        },
        xAxis: {
          axisLabel: x.xAxisLabel,
          tickFormat: function (d) {
            if (x.xAxisFormat == 'Day') {
              var dateLast = d;
              var format = d3.time.format("%b %d, %Y");
              var dateConvert = format(new Date(dateLast));
              return dateConvert;
            } else if (x.xAxisFormat == 'Month') {
              var dateLast = d;
              var format = d3.time.format("%Y %b");
              var dateConvert = format(new Date(dateLast));
              return dateConvert;
            } else if (x.xAxisFormat == 'Number') {
              return d3.format(',')(d);
            } else {
              return d;
            }
          }
        },
        yAxis: {
          axisLabelDistance: 15,
          axisLabel: 'Amount Sales .SYP',
          tickFormat: function (d) {
            return d3.format(',')(d);
          }
        },
        callback: function (chart) {
        }
        , interactiveLayer: {
          tooltip: {
            contentGenerator: function (e) {
              x.orderByPipe.transform(e.series, 'value', 0);

              var sum = 0;

              for (let index = 0; index < e.series.length; index++) {
                sum += e.series[index].value;
              }

              var format = d3.time.format("%b %d, %Y");

              if (x.xAxisFormat == 'Day') {
                format = d3.time.format("%b %d, %Y");

              } else if (x.xAxisFormat == 'Month') {
                format = d3.time.format("%Y %b");
              }


              var dateConvert = format(new Date(e.value));

              var temp = '<table><tr><td>Date</td><td>' + dateConvert + '</td></tr>';
              temp += '<tr><td>Total</td><td>' + (d3.format(',')(sum)) + '</td></tr>';

              for (let index = 0; index < e.series.length; index++) {

                const element = e.series[index];
                temp += '<tr><td><span style="min-width:15px;min-height:15px;background-color:' + element.color + '"></span></td> <td>' + element.key + '</td> <td>' + (d3.format(',')(element.value)) + '</td><td>' + Math.round((element.value / sum) * 100) + '%</td>  </tr>';
              }
              temp += '</table>'
              return temp;
            }
          }
        }
      }

    };

    for (let index = 0; index < this.data.length; index++) {
      this.data[index]["values"].reverse();
    }


  }
  ngOnInit() {

  }

}
