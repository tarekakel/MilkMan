import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material';
@Component({
  selector: 'app-variance-filter',
  templateUrl: './variance-filter.component.html',
  styleUrls: ['./variance-filter.component.css']
})
export class VarianceFilterComponent implements OnInit {
  @Output() applyFilters: EventEmitter<any> = new EventEmitter();

  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  m = this.Currentdate.getMonth();
  d = this.Currentdate.getDate();

  fromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 20)));
  todate = new FormControl(_moment(new Date()));
  pfromdate = new FormControl(_moment(new Date(this.y, this.m, this.d - 20)));
  ptodate = new FormControl(_moment(new Date()));

  from;
  to;
  pfrom;
  pto;

  major = [
    { name: 'All', id: '' },
    { name: 'Decrease', id: 'Decrease' },
    { name: 'Increase', id: 'Increase' },
    { name: 'Equal', id: 'Equal' }
  ]

  filterby = [
    {name: 'AREA',id: 'AREA'},
    {name: 'CITY',id: 'CITY'},
    {name: 'GROUP',id: 'GROUP'},
    {name: 'MATERIAL NAME',id: 'MATERIAL_NAME'}
  ]

  Selectedfilterby = {name: 'AREA',id: 'AREA'};
  SelectedMajor = { name: 'All', id: '' };


  Percentage = 0;

  constructor() { }

  ngOnInit() {
    this.from = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');

    this.to = _moment(new Date()).format('MM/DD/YYYY');

    this.pfrom = _moment(new Date(this.y, this.m, this.d - 20)).format('MM/DD/YYYY');

    this.pto = _moment(new Date()).format('MM/DD/YYYY');

    this.apply();
  }


  ChangeFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.from = _moment(event.value).format('MM/DD/YYYY');
  }

  ChangeTo(type: string, event: MatDatepickerInputEvent<Date>) {
    this.to = _moment(event.value).format('MM/DD/YYYY');
  }


  pChangeFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.pfrom = _moment(event.value).format('MM/DD/YYYY');
  }

  pChangeTo(type: string, event: MatDatepickerInputEvent<Date>) {
    this.pto = _moment(event.value).format('MM/DD/YYYY');
  }

  SelectMajor(value) {
    this.SelectedMajor = value;
  }
  Selectfilterby(value){
    this.Selectedfilterby = value;
  }
  apply() {
    let temp = {
      FromP: this.from,
      ToP: this.to,
      FromP2: this.pfrom,
      ToP2: this.pto,
      Major: this.SelectedMajor.id,
      Percentage: this.Percentage,
      select : this.Selectedfilterby.id
    };

    this.applyFilters.emit(temp);
  }

}
