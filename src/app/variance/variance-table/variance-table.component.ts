import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../shared/get-data.service';

@Component({
  selector: 'app-variance-table',
  templateUrl: './variance-table.component.html',
  styleUrls: ['./variance-table.component.css']
})
export class VarianceTableComponent implements OnInit {

  filter;

  ShowTable = true;
  nodata = false;
  loading = true;
  dataSource = [];
  columnsDef = [];


  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
  }

  Load(filter) {
    this.filter = filter;
    this.nodata = false;
    this.loading = true;
    let x = this;

    this.getDataService.getJsonWithParam('Variance', this.filter).subscribe(Response => {
      let _data = <Array<any>>Response.body;
      console.log(_data);
      if (_data.length != 0) {
        this.InitColumns(Object.keys(_data[0]));
        this.dataSource = _data;
      } else {
        this.nodata = true;
      }
      this.loading = false;
    })
  }

  InitColumns(keys) {
    this.columnsDef = [];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      let title = "";
      let format = "";

      if (element == "Material_Name") {
        title = "Material Name";
      }

      if (element == "Item") {
        title = "Item";
      }

      if (element == " Total for period one") {
        title = "Total for period one";
        format = "number";
      }
      if (element == "Total for period two") {
        title = "Total for period two";
        format = "number";
      }
      if (element == "diff") {
        title = "Varince";
        format = "number";
      }

      if (element == "Major") {

      }

      if (element == "PER") {
        title = "Percentage";
        format = "percentage";
      }

      this.columnsDef.push({
        def: element,
        title: title == "" ? element : title,
        format: format,
        td_style: {},
        th_style: '',
        icon: '',
        option: '',
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
