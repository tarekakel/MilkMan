import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';

@Component({
  selector: 'app-dashbord-top-chart',
  templateUrl: './dashbord-top-chart.component.html',
  styleUrls: ['./dashbord-top-chart.component.css']
})
export class DashbordTopChartComponent implements OnChanges {

  @Input() tap;
  @Input() sort;
  @Input() oredr;
  @Input() filter;
  @Input() top;
  @Input() city = '';
  @Input() groupid = '';
  single: any[] = [];
  multi: any[];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Name';
  showYAxisLabel = true;
  yAxisLabel = '';
  loading = false;
  colorScheme = {
    domain: ['#d17575',
      '#d1a375',
      '#d1d175',
      '#d175a3',
      '#75d175',
      '#75d1d1',
      '#758cd1',
      '#d175d1',
      '#75a3d1',
      '#a3d175',
      '#d1ba75',
      '#8c75d1',
      '#75bad1',
      '#d18c75',
      '#ba75d1',
      '#75d1ba']
  };

  constructor(private getDataService: GetDataService) {
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    let x = this;
    //let uri = "dashboard?Q=" + this.tap + "&OrderBy=" + this.oredr + "&Sorting=" + this.sort + "&FilterForDates=" + this.filter + "&TOPS=" + this.top;
    let uri = "dashboard/top";
    this.loading = true;
    this.getDataService.getJsonWithParam(uri, {
      "TopType": this.tap,
      "TopCount": this.top,
      "Duration": this.filter,
      "Sorting": this.sort,
      "OrderBy": this.oredr,
      "GroupID": this.groupid,
      "City": this.city,
    }).subscribe(Response  => {
      let __Array = <Array<any>>Response.body;
      let temp = [];
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        let name = "";

        if (this.tap == 1) {
          name = element["Material_Name"];
        }

        if (this.tap == 2) {
          name = element["Account_Name"];
        }

        if (this.tap == 3) {
          name = element["SalesMan"];
        }

        if(!(name)){
          name = 'NA'
        }
        if (this.oredr == "total_sales_amount") {
          temp.push({ name: name, value: element["total_sales_amount"] });
        }
        if (this.oredr == "total_seles_count") {
          temp.push({ name: name, value: element["total_seles_count"] });
        }


      }
      x.single = temp;
      this.loading = false;
    });

  }
  onSelect($event) {

  }
}
