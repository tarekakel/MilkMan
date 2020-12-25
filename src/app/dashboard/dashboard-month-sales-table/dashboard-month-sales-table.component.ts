import { Component, OnInit, SimpleChanges, ViewChild, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { GetDataService } from '../../shared/get-data.service';
import { OrderByPipe } from 'src/app/shared/order-by.pipe';
import { DashboardSalesTableMonthDialogComponent } from './dashboard-sales-table-month-dialog/dashboard-sales-table-month-dialog.component';
@Component({
  selector: 'app-dashboard-month-sales-table',
  templateUrl: './dashboard-month-sales-table.component.html',
  styleUrls: ['./dashboard-month-sales-table.component.css']
})
export class DashboardMonthSalesTableComponent implements OnInit,OnChanges {
  @Input() company_name;
  @Input() category_name;
  @Input() group_code;
  @Input() material_code;
  @Input() city;

  ELEMENT_DATA: Array<sales_month_table> = [];
  TableLoading = false;
  noData = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['act_month', 'Total_sales_Amount','AVG','Total_Account_Name', 'Total_sales_count', 'Gift_Cost', 'Gift_Count'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  constructor(public dialog: MatDialog,private getDataService: GetDataService, private order: OrderByPipe) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let uri = '';
    if (this.company_name != '') {
      uri += '"Company":"' + this.company_name + '",';
    }

    if (this.category_name != '') {
      uri += '"materialID":"' + this.category_name + '",';
    }

    if (this.group_code != '') {
      uri += '"Group_Code":"' + this.group_code + '",';
    }

    if (this.material_code != '') {
      uri += '"Material_Code":"' + this.material_code + '",';
    }
 
    if(uri != ''){
      uri = '?Param={' + uri.slice(0,-1) + '}&city=' + this.city;
    }
    else{
      uri = '?city=' + this.city;
    }
    
    let x = this;
    this.TableLoading = true;
    this.getDataService.getJson( 'dashboard' +uri).subscribe(_Array => {
      let __Array = (<Array<any>>_Array);
      let temp: Array<sales_month_table> = [];
      __Array = x.order.transform(__Array, 'act_month', 1);
      x.getDataService.getJson('dashboard/AVG' + uri).subscribe(_Array => {
        
        let ___Array = <Array<any>>_Array;



        let avg_temp = [];
        for (let index = 0; index < __Array.length; index++) {
          let element = __Array[index];
          let _element = "";
          for (let index = 0; index < ___Array.length; index++) {
            const __element = ___Array[index];
            if(element["act_month"] == __element["act_month"]){
              _element = __element;
            }
          }
          let d = Date.parse((''+element["act_month"]).split('-')[0] + ', 1 ' + (''+element["act_month"]).split('-')[1]);
          temp.push({
            act_month: new Date(d),
            Total_sales_Amount: element.Total_sales_Amount,
            Total_sales_count: element.Total_sales_count,
            AVG : Math.round(_element["Daily_avg"]),
            Gift_Cost: element.Gift_Cost,
            Gift_Count: element.Gift_Count,
            statu: element.statu,
            Total_Account_Name : element.Total_Account_Name
          });
        }
        x.ELEMENT_DATA = temp;
        x.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        x.dataSource.sort = this.sort;
        x.dataSource.paginator = this.paginator;
        x.TableLoading = false;
        if (x.ELEMENT_DATA.length == 0) {
          x.noData = true;
        } else {
          x.noData = false;
        }

      });

     

      
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ShowStatus(element){
    this.openDialog(element);
  }

  openDialog(element) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data = element;
    this.dialog.open(DashboardSalesTableMonthDialogComponent, dialogConfig);
  }
}


export class sales_month_table {
  act_month: Date;
  Total_sales_Amount: number;
  Total_sales_count: number;
  AVG:number;
  Gift_Cost: number;
  Gift_Count: number;
  statu: string;
  Total_Account_Name : string;
}