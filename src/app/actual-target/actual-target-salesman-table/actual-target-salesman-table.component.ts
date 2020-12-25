import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';

@Component({
  selector: 'app-actual-target-salesman-table',
  templateUrl: './actual-target-salesman-table.component.html',
  styleUrls: ['./actual-target-salesman-table.component.css']
})
export class ActualTargetSalesmanTableComponent implements OnInit {
  message = false;

  selected_month = "";
  selected_city = "";
  selected_head = "";

  ShowTable = true;
  Loading = true;
  nodata = false;
  columnsDef = [];
  TableData = [];
  @Output() SelectRow = new EventEmitter();

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
  }

  optionClick(event) {
    this.SelectRow.emit(event);
  }

  LoadData(month, city, head) {
    this.message = false;
    if (city == "Without Target") {
      this.message = true;
    } else {
      this.selected_month = month.split('-')[0] + '-' + month.split('-')[1];
      this.selected_city = city;
      this.selected_head = head;
      this.InitTable();
    }
  }

  InitTable() {
    let x = this;
    let uri = "Target";
    this.ShowTable = true;
    this.Loading = true;
    this.nodata = false;
    this.getDataService.getJsonWithParam(uri, { Month: this.selected_month, City: this.selected_city, Head: this.selected_head }).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      if (_data.length != 0) {
        // for (let index = 0; index < _data.length; index++) {
        //   _data[index].filter = "";
        //   _data[index].index = index;
        //   _data[index].statusOption = '';
        //   if (index == _data.length - 1) {
        //     _data[index].statusOption = 'selected';
        //     this.SelectRow.emit({ element: _data[index] });
        //   }
        // }
        x.InitColumns(_data);
        x.TableData = _data;
      } else {
        x.nodata = true;
      }
      x.Loading = false;
    });
  }

  InitColumns(Data) {

    const element = Data[0];

    this.columnsDef = [];

    let keys = Object.keys(element);

    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      let title = "";
      let format = "";
      let icon = "";
      let option = "";

      if (element == "EmployeeName") {
        title = "Sales Man"
      }

      if (element == "act") {
        title = "actual";
      }

      if (element == "Target") {
        format = "number";
      }

      if (element == "act") {
        title = "Actual";
        format = "number";
      }

      if (element == "filter") {
        title = "Filter";
        option = "select";
        icon = "funnel";
      }

      if (element == "Month") {
        format = "tmonth";
      }

      if (element == "PER") {
        title = "Percentage";
        format = "percentage";
      }

      if (element != 'index' && element != 'statusOption')
        this.columnsDef.push({
          def: element,
          title: title == "" ? element : title,
          format: format,
          td_style: {},
          th_style: '',
          icon: icon,
          option: option,
          iconColor: '',
          icons: [{
            status: 'string',
            name: 'string',
            style: 'string'
          }]
        });
    }
  }
}
