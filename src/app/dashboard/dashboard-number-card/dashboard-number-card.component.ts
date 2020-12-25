import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetDataService } from 'src/app/shared/get-data.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DashboardDialogCardComponent, CardDialogData } from './dashboard-dialog-card/dashboard-dialog-card.component';
import * as _moment from 'moment';


@Component({
  selector: 'app-dashboard-number-card',
  templateUrl: './dashboard-number-card.component.html',
  styleUrls: ['./dashboard-number-card.component.css']
})
export class DashboardNumberCardComponent implements OnInit {
  loading = true;
  @Input() cardDays = 1;
  data = [];
  All;
  multi: any[];
  counto = [];
  view: any[] = [700, 400];
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();
  yesterday = _moment(new Date(this.y, this.m, this.d - 1)).format('ddd DD, MMM');
  colorScheme = {
    domain: ['#a3d175',
      '#d1ba75',
      '#8c75d1',
      '#d175d1',
      '#d18c75',
      '#ba75d1',
      '#d17575',
      '#d1a375',
      '#d1d175',
      '#d175a3',
      '#75d175',
      '#75d1d1',
      '#75bad1',
      '#758cd1',
      '#75a3d1',
      '#75d1ba']
  };

  openDialog(chartDialogData: CardDialogData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.data = chartDialogData;
    this.dialog.open(DashboardDialogCardComponent, dialogConfig);
  }
  constructor(public dialog: MatDialog, private getDataService: GetDataService) {

  }

  onSelect(event) {
    let chartDialogData :CardDialogData = {day : this.cardDays ,material : event };
    this.openDialog(chartDialogData)
  }

  
  ngOnInit() {
    this.onSearchChange(this.cardDays);
  }
  onSearchChange(value) {
    value = Number(value) + 1;
    let x = this;
    this.loading = true;
    this.getDataService.getJsonWithParam('dashboard',{Last:value}).subscribe(Response => {
      let __Array = <Array<any>>Response.body;
      console.log(__Array);
      let temp = [];
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        if(element["Vmaterial"] == "ALL"){
          x.All = __Array[index];
        }else{
          temp.push(element);
        }
      }
      
      x.data = temp;
      x.loading = false;
    });
  }

  onCountoEnd(){

  }

  countoChange($event,i){
    this.counto[i] = Math.round($event);
  }
}
