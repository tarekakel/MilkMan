import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GetDataService } from 'src/app/shared/get-data.service';
import * as shape from 'd3-shape';
import { Group } from 'src/app/sales/sales-filters/sales-filters.component';
import { of } from 'rxjs';
import { OrderByPipe } from 'src/app/shared/order-by.pipe';
import * as _moment from 'moment';

@Component({
  selector: 'app-dialog-sales-chart',
  templateUrl: './dialog-sales-chart.component.html',
  styleUrls: ['./dialog-sales-chart.component.css']
})
export class DialogSalesChartComponent implements OnInit {
  title = "";
  public single$ = of([]);
  multi: any[];
  loading = true;
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  curve: any = shape.curveCatmullRom.alpha(0.5);
  // line, area
  autoScale = true;



  onSelect(event) {
  }
  constructor(private getDataService: GetDataService,
    public dialogRef: MatDialogRef<DialogSalesChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChartDialogData, private orderBy: OrderByPipe) {

  }
  
  ngOnInit() {

    let keys = Object.keys(this.data);

    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      if (element == "GroupBy") {
        if (this.data.GroupByClass.Scop != '') {
          if (this.data.GroupByClass.Scop == '"item2":"city" ,"item3":"area","item4":"Account_Name"') {
            this.data.ShopName = this.data.event.element.Account_Name;
            this.data.CityName = this.data.event.element.city;
            this.data.AreaName = this.data.event.element.area;
            this.title = this.data.CityName + ' / ' + this.data.AreaName + ' / ' + this.data.ShopName;
            let uri = this.buildUri();



            this.getDataService.getJson(uri).subscribe(_Array => {

              let __Array = <Array<any>>_Array;
              let temp_chart = [];

              if (this.data.GroupByClass.Date == '"DateFor":"DAY"') {
                for (let index = 0; index < __Array.length; index++) {
                  const element = __Array[index];
                  let d = ('' + element["DAY"]).split('/')[0] + '/' + ('' + element["DAY"]).split('/')[1] + '/' + ('' + element["DAY"]).split('/')[2];
                  
                  temp_chart.push({
                    "name": d,
                    "value": element.Total_Amount
                  });
                }
                this.xAxisLabel = 'Day';
                this.yAxisLabel = 'Sales Amount .SYP';
                temp_chart = this.orderBy.transform(temp_chart, "name", 1)
                this.single$ = of([{ "name": "DAY", "series": temp_chart }]);
              }

              if (this.data.GroupByClass.Date == '"DateFor":"MONTH"') {
                for (let index = 0; index < __Array.length; index++) {
                  const element = __Array[index];
                  element.MONTH = _moment(element.MONTH).format('MM-YYYY').toString();
                  temp_chart.push({
                    "name": element.MONTH,
                    "value": element.Total_Amount
                  });
                }
                this.xAxisLabel = 'Month';
                this.yAxisLabel = 'Sales Amount .SYP';
                temp_chart = this.orderBy.transform(temp_chart, "name", 1);
                this.single$ = of([{ "name": "MONTH", "series": temp_chart }]);
              }
              this.loading = false;
            });
          }
        }
        // if (this.data.GroupByClass.Date != '') {
        //   if (this.data.GroupByClass.Date != '"DateFor":"DAY"') {

        //   }
        // }
      }
    }


  }


  buildUri() {
    let uri = '';

    uri = 'sales?Filters={}';
    if (this.data.CompanyName != '' && this.data.CategoryName == '' && this.data.Group_Code == '' && this.data.Material_Code == '') {
      uri = 'sales?Filters={"Company":"' + this.data.CompanyName + '"}'
    }

    if (this.data.CompanyName != '' && this.data.CategoryName != '' && this.data.Group_Code == '' && this.data.Material_Code == '') {
      uri = 'sales?Filters={"Company":"' + this.data.CompanyName + '","materialID":"' + this.data.CategoryName + '"}';
    }

    if (this.data.CompanyName != '' && this.data.CategoryName != '' && this.data.Group_Code != '' && this.data.Material_Code == '') {
      uri = 'sales?Filters={"Company":"' + this.data.CompanyName + '","materialID":"' + this.data.CategoryName + '","Group_Code":"' + this.data.Group_Code + '"}';
    }

    if (this.data.CompanyName != '' && this.data.CategoryName != '' && this.data.Group_Code != '' && this.data.Material_Code != '') {
      uri = 'sales?Filters={"Company":"' + this.data.CompanyName + '","materialID":"' + this.data.CategoryName + '","Group_Code":"' + this.data.Group_Code + '","Material_Code":"' + this.data.Material_Code + '"}';
    }

    if (this.data.CityName != "") {
      if (this.data.ShopName == "" && this.data.AreaName != "") {
        uri += '&Filter1={"city":"' + this.data.CityName + '","area":"' + this.data.AreaName + '"}';
      } else if (this.data.ShopName != "" && this.data.AreaName != "") {
        uri += '&Filter1={"city":"' + this.data.CityName + '","area":"' + this.data.AreaName + '","Account_Name":"' + this.data.ShopName + '"}';
      } else {
        uri += '&Filter1={"city":"' + this.data.CityName + '"}';
      }
    } else {
      uri += '&Filter1={}';
    }


    if (this.data.GroupBy != '') {
      uri += '&GroupBy=' + this.data.GroupBy;
    } else {
      uri += '&GroupBy={}'
    }


    uri += '&From=' + this.data.from + '&To=' + this.data.to;

    if(this.data.SalesMan == ''){
      uri += '&SalesMan=';
    }
    else{
      uri += '&SalesMan=' + this.data.SalesMan;
    }
    return uri;

  }

}

export class ChartDialogData {
  event: any;
  from: string;
  to: string;
  CompanyName: string;
  CategoryName: string;
  Group_Code: string;
  Material_Code: string;
  CityName: string;
  AreaName: string;
  ShopName: string;
  GroupBy: string;
  GroupByClass: Group;
  SalesMan : string;
}

