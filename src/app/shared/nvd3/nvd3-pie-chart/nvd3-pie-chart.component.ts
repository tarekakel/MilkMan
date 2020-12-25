import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-nvd3-pie-chart',
  templateUrl: './nvd3-pie-chart.component.html',
  styleUrls: ['./nvd3-pie-chart.component.css']
})
export class Nvd3PieChartComponent implements OnChanges {
  @Input() justPercent = false;
  @Input() data;
  @Input() options;
  @Input() height = 100;
  @Input() width = 300;
  constructor() { }
  dbClick = false;
  ngOnChanges() {

    let x = this;
    let total = 0;

    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      total += element['y']
    }

    let copyTotal = total;
    this.options = {
      chart: {
        type: 'pieChart',
        height: x.height,
        width: x.width,
        donut: true,
        x: function (d) { return d.key; },
        y: function (d) { return d.y; },
        showLabels: false,

        pie: {
          // startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
          // endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
        },
        duration: 500,
        showLegend: true,
        legend: {
          rightAlign: true,
          margin: {
            top: 5,
            right: 0,
            bottom: 0,
            left: 0
          },
          dispatch: {
            legendClick: function (e) {
              if (e.y != total && !x.dbClick) {
                if (e.disabled == false) {
                  total = total - e.y;
                } else {
                  total = total + e.y;
                }
              } else {
                x.dbClick = false;
                total = copyTotal;
              }
            },
            legendDblclick: function (e) {
              x.dbClick = true;
              total = e.y;
            }
          }
        },
        tooltip: {
          contentGenerator: function (d) {
            var temp = "";
            console.log(d.data.key);
            console.log(x.justPercent);
            if (x.justPercent == true) {
              temp = `<span style="width:100%;height:4px;background-color:` + d.color + `"></span>
              <p>`+ d.data.key + `</p>
              <p>`+ Math.round((d.data.y / total) * 100) + `%</p>`;
            } else {
              temp =
              `<span style="width:100%;height:4px;background-color:` + d.color + `"></span>
              <p>`+ d.data.key + `</p>
              <p>` + (d3.format(',')(d.data.y)) +  `.SYP</p>
              <p>`+ Math.round((d.data.y / total) * 100) + `%</p>`;
            }

            return temp;
          }
        }
      }
    };
  }
}


