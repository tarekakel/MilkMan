import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ExportExcelService } from 'src/app/shared/exports/export-excel.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit, OnChanges {

  constructor(private exportExcelService:ExportExcelService){

  }

  @Input() columnsDef: Array<ColumnsDef> = new Array<ColumnsDef>();
  @Input() pageSizeOptions = [10];
  @Input() data = [];
  @Input() activePages = true;
  @Input() activeTotal = false;
  @Input() options = [];
  @Input() addFilter = false;
  @Input() matSortActive = '';
  @Input() matSortDirection = '';
  @Input() loading = false;
  @Input() nodata = false;

  @Input() ShowExport = false;
  displayedColumns: string[] = [];
  dataSource ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.Refresh();
  }

  Refresh() {

    this.displayedColumns = this.columnsDef.map(x => x.def);

    


    this.dataSource = new MatTableDataSource<any>(this.data);
    if(this.activePages == true){
      this.dataSource.paginator = this.paginator;
    }
    
    this.dataSource.sort = this.sort;
    this.matSortActive = this.matSortActive;
    this.matSortDirection = this.matSortDirection;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @Output() ClickOptionEvent: EventEmitter<any> = new EventEmitter();

  ClickOption(option,icon,title,element){
    if(option == 'select'){
      for (let index = 0; index < this.data.length; index++) {
        this.data[index].statusOption = '';
        if(element.index == index){
          this.data[index].statusOption = 'selected';
        }
      }
    }
    this.ClickOptionEvent.emit({option,icon,title,element});
  }

  export(){
    this.exportExcelService.saveExcelFile(this.data,"data");
  }

  getType(value ,element,item){
    return typeof value;
  }
}


export interface ColumnsDef {
  def: string;
  title: string;
  format: string;
  td_style: any;
  th_style: string;
  icons: Array<Icon>;
  icon : string;
  Total : number;
  iconColor :string;
  option : string;
}



export interface Icon {
  status: string;
  name: string;
  style: string;
}

