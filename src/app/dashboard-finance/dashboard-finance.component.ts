import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardFinanceTableComponent } from './dashboard-finance-table/dashboard-finance-table.component';

@Component({
  selector: 'app-dashboard-finance',
  templateUrl: './dashboard-finance.component.html',
  styleUrls: ['./dashboard-finance.component.css']
})
export class DashboardFinanceComponent implements OnInit {

  @ViewChild('tfilter') tfilter: DashboardFinanceTableComponent;

  constructor() { }

  ngOnInit() {
  }

  applyFilters($event){
    this.tfilter.apply($event);
  }
}
