import { Component, OnInit, ViewChild, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { GetDataService } from '../../shared/get-data.service';
import { GetDateService } from '../../shared/get-date.service';
import { OrderByPipe } from '../../shared/order-by.pipe';
import { DashboardSalesTableDialogComponent } from './dashboard-sales-table-dialog/dashboard-sales-table-dialog.component';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent implements OnInit, OnChanges {

  @Input() from;
  @Input() to;
  @Input() company_name;
  @Input() category_name;
  @Input() group_code;
  @Input() material_code;
  @Input() city;

  ELEMENT_DATA = [];
  TableLoading = false;
  noData = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['act_date', 'Total_sales_Amount','Total_Account_Name', 'Total_sales_count', 'Gift_Cost', 'Gift_Count'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  constructor(public dialog: MatDialog,private getDataService: GetDataService, private getDateService: GetDateService, private orderBy: OrderByPipe) {

  }


  openDialog(element) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data = element;
    this.dialog.open(DashboardSalesTableDialogComponent, dialogConfig);
  }


  ngOnInit() {
    this.OnInitTable();
  }


  OnInitTable() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

    uri = 'dashboard?Param={' + uri.slice(0,-1) + '}&From=' + this.from + '&To=' + this.to + '&city=' + this.city;
 
    let x = this;
    this.TableLoading = true;
    this.getDataService.getJson(uri).subscribe(_Array => {
      x.ELEMENT_DATA = (<Array<any>>_Array);
      let temp: Array<sales_daily_table> = [];
      
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
  }
  ShowStatus(element){
    this.openDialog(element);
  }

}

export class sales_daily_table {
  act_date: Date;
  act_dateStr: string;
  Total_sales_Amount: number;
  Total_sales_count: number;
  Gift_Cost: number;
  Gift_Count: number;
  statu: string;
  Total_Account_Name:number;
}