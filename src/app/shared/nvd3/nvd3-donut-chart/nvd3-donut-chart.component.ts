import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NvD3Component } from 'ng2-nvd3';

@Component({
  selector: 'app-nvd3-donut-chart',
  templateUrl: './nvd3-donut-chart.component.html',
  styleUrls: ['./nvd3-donut-chart.component.css']
})
export class Nvd3DonutChartComponent implements OnInit {

  @ViewChild('chartid') chartid: ElementRef;


  @Input() data;
  @Input() options;
  @Input() height = 100;
  constructor() {

  }

  ngOnChanges() {
    let x = this;
    this.options = {
      chart: {
        type: 'pieChart',
        height: x.height + 100,
        width: 300,
        donut: true,
        x: function (d) { return d.key; },
        y: function (d) { return d.y; },
        showLabels: true,

        pie: {
          startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
          endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
        },
        duration: 500,
        showLegend: false,
        legend: {
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      }
    };


  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.chartid["el"].firstChild.style.height = this.height  + 'px';
  }
}


export class DonutChartData {
  key;
  y
}

