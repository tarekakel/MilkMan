import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-nvd3-line-plus-bar-chart',
  templateUrl: './nvd3-line-plus-bar-chart.component.html',
  styleUrls: ['./nvd3-line-plus-bar-chart.component.css']
})
export class Nvd3LinePlusBarChartComponent implements OnInit, OnChanges {
  options;
  data = [];
  constructor() { }

  ngOnChanges() {

  }

  ngOnInit() {
    this.data = [
      {
        "key": "Quantity (left axis)",
        "bar": true,
        "values": [{x:1136005200000, y:1271000.0}, {x:1138683600000, y:1271000.0}, {x:1141102800000, y:1271000.0}],
        originalKey: "Quantity"
      },
      {
        "key": "Price (right axis)",
        "values": [{x:1136005200000, y:71.89}, {x:1138683600000, y:75.51}, {x:1141102800000, y:68.49}],
        originalKey: "Quantity"
      }
    ];

    this.options = {
      chart: {
        type: 'linePlusBarChart',
        height: 500,
        margin: {
          top: 30,
          right: 75,
          bottom: 50,
          left: 75
        },
        bars: {
          forceY: [0]
        },
        bars2: {
          forceY: [0]
        },
        color: ['#2ca02c', 'darkred'],
        x: function (d, i) { return i },
        xAxis: {
          axisLabel: 'X Axis',
          tickFormat: function (d) {
            var dx = this.data[0].values[d] && this.data[0].values[d].x || 0;
            if (dx > 0) {
              return d3.time.format('%x')(new Date(dx))
            }
            return null;
          }
        },
        x2Axis: {
          tickFormat: function (d) {
            var dx = this.data[0].values[d] && this.data[0].values[d].x || 0;
            return d3.time.format('%b-%Y')(new Date(dx))
          },
          showMaxMin: false
        },
        y1Axis: {
          axisLabel: 'Y1 Axis',
          tickFormat: function (d) {
            return d3.format(',f')(d);
          },
          axisLabelDistance: 12
        },
        y2Axis: {
          axisLabel: 'Y2 Axis',
          tickFormat: function (d) {
            return '$' + d3.format(',.2f')(d)
          }
        },
        y3Axis: {
          tickFormat: function (d) {
            return d3.format(',f')(d);
          }
        },
        y4Axis: {
          tickFormat: function (d) {
            return '$' + d3.format(',.2f')(d)
          }
        }
      }
    };

    
  }

}
