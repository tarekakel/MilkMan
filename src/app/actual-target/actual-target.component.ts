import { Component, OnInit, ViewChild } from '@angular/core';
import { ActualTargetCityTableComponent } from './actual-target-city-table/actual-target-city-table.component';
import { ActualTargetHeadTableComponent } from './actual-target-head-table/actual-target-head-table.component';
import { ActualTargetSalesmanTableComponent } from './actual-target-salesman-table/actual-target-salesman-table.component';

@Component({
  selector: 'app-actual-target',
  templateUrl: './actual-target.component.html',
  styleUrls: ['./actual-target.component.css']
})
export class ActualTargetComponent implements OnInit {

  selected_month = "";
  selected_city = "";
  selected_head = "";


  @ViewChild('actualTargetCityTableComponent') actualTargetCityTableComponent: ActualTargetCityTableComponent
  @ViewChild('actualTargetHeadTableComponent') actualTargetHeadTableComponent: ActualTargetHeadTableComponent
  @ViewChild('actualTargetSalesmanTableComponent') actualTargetSalesmanTableComponent: ActualTargetSalesmanTableComponent;
  
  constructor() { }

  ngOnInit() {
  }

  SelectMonth(event) {
    this.selected_month = event.element.Month;
    this.actualTargetCityTableComponent.LoadData(event.element.Month);
    this.actualTargetHeadTableComponent.Loading = true;
    this.actualTargetSalesmanTableComponent.Loading = true;
  }

  SelectCity(event) {
    this.selected_city = event.element.City;
    this.actualTargetHeadTableComponent.LoadData(this.selected_month, event.element.City);
    this.actualTargetHeadTableComponent.Loading = true;
    this.actualTargetSalesmanTableComponent.Loading = true;
  }

  SelectHead(event) {
    this.selected_head = event.element.Head;
    this.actualTargetSalesmanTableComponent.LoadData(this.selected_month,this.selected_city,event.element.Head);
    this.actualTargetSalesmanTableComponent.Loading = true;
  }
}
