import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { _chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit,OnChanges {

  chart;
  @Input() Data = [];
  // ADD CHART OPTIONS. 
  pieChartOptions = {
    responsive: true
  }

  pieChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];

  // CHART COLOR.
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ]

  pieChartData: any = [
    {
      data: []
    }
  ];
  constructor() { }

  ngOnInit() {

    // this.chart = new _chart('canvas', {
    //   type: 'pie',
    // })

  }

  ngOnChanges(simpleChanges : SimpleChanges){
    this.pieChartData.data = this.Data;
  }

  onChartClick(event) {
  }
}


export interface PieChart {

}