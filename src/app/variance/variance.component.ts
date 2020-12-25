import { Component, OnInit, ViewChild } from '@angular/core';
import { VarianceTableComponent } from './variance-table/variance-table.component';

@Component({
  selector: 'app-variance',
  templateUrl: './variance.component.html',
  styleUrls: ['./variance.component.css']
})
export class VarianceComponent implements OnInit {
  @ViewChild('varianceTableComponent') varianceTableComponent: VarianceTableComponent;
  filter;
  constructor() { }

  ngOnInit() {
  }


  applyFilters(event) {
    this.filter = event;
    this.varianceTableComponent.Load(event);
  }
}
