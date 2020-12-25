import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GetDataService } from '../../shared/get-data.service';
import { ColumnsDef } from 'src/app/shared/tools/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-dashbord-top-table',
  templateUrl: './dashbord-top-table.component.html',
  styleUrls: ['./dashbord-top-table.component.css']
})
export class DashbordTopTableComponent implements OnChanges {

  @Input() tap;
  @Input() sort;
  @Input() oredr;
  @Input() filter;
  @Input() top;
  @Input() city = '';
  @Input() groupid = '';

  //table option
  ShowTable = true;
  nodata = false;
  loading = true;
  data = [];
  columnsDef: Array<ColumnsDef> = []
  addFilter = false;
  pageSizeOptions = [10];
  constructor(private getDataService: GetDataService) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let x = this;
    //uri = "dashboard?Q=" + this.tap + "&OrderBy=" + this.oredr + "&Sorting=" + this.sort + "&FilterForDates=" + this.filter + "&TOPS=" + this.top;
    let uri = "dashboard/top";
    this.loading = true;
    this.ShowTable = false;
    this.getDataService.getJsonWithParam(uri, {
      "TopType": this.tap,
      "TopCount": this.top,
      "Duration": this.filter,
      "Sorting": this.sort,
      "OrderBy": this.oredr,
      "GroupID": this.groupid,
      "City": this.city
    }).subscribe(Response  => {
      let __Array = <Array<any>>Response.body;
      console.log(__Array);
      if (__Array.length != 0) {
        x.initTable(Object.keys(__Array[0]));
        x.data = __Array;
        x.nodata = false;
        this.ShowTable = true;
      } else {
        x.nodata = true;
      }
      x.loading = false;
    });
  }


  initTable(keys) {
    this.columnsDef = [];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];

      let title = "";
      let format = "";
      let icon = "";
      let option = "";
    

      if (element == "Material_Name") {
        title = "Material Name";
      }
      if (element == "Account_Name") {
        title = "Account Name";
      }

      if (element == "SalesMan") {
        title = "Sales Man";
      }

      if (element == "total_sales_amount") {
        title = "Sales Amount";
        format = "number";
      }

      if (element == "total_seles_count") {
        title = "Item Count (Sales)";
        format = "number";
      }


      this.columnsDef.push({
        def: element,
        title: title == "" ? element : title,
        format: format,
        td_style: '',
        th_style: '',
        icon: icon,
        iconColor:'',
        option: option,
        Total:null,
        icons: [{
          status: 'string',
          name: 'string',
          style: 'string'
        }]
      });

    }
  }

  optionClick($event) {

  }
}
