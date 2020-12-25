import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-tree-map',
  templateUrl: './dashboard-tree-map.component.html',
  styleUrls: ['./dashboard-tree-map.component.css']
})
export class DashboardTreeMapComponent implements OnInit {

  constructor() {
    Object.assign(this, { single })
  }

  ngOnInit() {
    if(window.innerWidth > 980){
      this.view = [window.innerWidth * 27.33 / 100, 200]
    }else if(window.innerWidth <= 980){
      this.view = [window.innerWidth * 86.33 / 100, 200]
    }
  }
  single: any[];
  multi: any[];
  view: any[] = [0, 0];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelect(event) {
    
  }

  onResize($event) {
    if($event.currentTarget.innerWidth > 980){
      this.view = [$event.currentTarget.innerWidth * 27.33 / 100, 200]
    }else if($event.currentTarget.innerWidth <= 980){
      this.view = [$event.currentTarget.innerWidth * 86.33 / 100, 200]
    }
  }
}

export var single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  }
];

export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];
