import { Component, OnInit, ViewChild } from '@angular/core';
import { XlsxReaderComponent } from 'src/app/shared/xlsx-reader/xlsx-reader.component';
import { ExportExcelService } from 'src/app/shared/exports/export-excel.service';
import { GetDataService } from 'src/app/shared/get-data.service';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


export class Emp_Target {
  ActMonth;
  RepName;
  Head;
  Target;
  City;
}




@Component({
  selector: 'app-upload-target',
  templateUrl: './upload-target.component.html',
  styleUrls: ['./upload-target.component.css']
})
export class UploadTargetComponent implements OnInit {
  @ViewChild('uploadfile') uploadfile: XlsxReaderComponent;

  displayedColumns: string[] = [];
  dataSource: Emp_Target[] = [];
  done = false;
  loading = false;
  DoneMessage = "";
  constructor(private exportExcelService: ExportExcelService, private getDataService: GetDataService, public snackBar: MatSnackBar) { }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 15000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  ngOnInit() {
    this.displayedColumns = ['Month', 'Name', 'Head', 'Target', 'City'];
  }

  ReadingData($event) {
    let keys = Object.keys($event[0]);
    let columns = ['Month', 'Name', 'Head', 'Target', 'City']
    let error = false;
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      if(columns.indexOf(element) == -1){
        error = true;
      }
    }
    if(error){
      this.openSnackBar('Tamplate Error : Please download a new template and bound by its structure','');
    }else{
      this.dataSource = $event;
      this.uploadfile.clear();
    }
  }

  DeleteAll() {
    this.dataSource = [];
    this.done = false;
  }

  Edit(element) {
  }

  Delete(element) {
    const index = this.dataSource.indexOf(element);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }


  download_template() {

    this.getDataService.getJson('salesMan').subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      let temp = [];
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        if (element["SalesMan"] != 'NA') {
          temp.push({ 'Month': new Date().getFullYear() + '-' + (new Date().getMonth() + 1), 'Name': element["SalesMan"], 'Head': '', 'Target': '', 'City': '' });
        }
      }
      this.exportExcelService.saveExcelFile(temp, "template_" + new Date().getFullYear() + '-' + (new Date().getMonth() + 1));
    });

  }


  LoadData() {
    this.loading = true;
    this.getDataService.postJson("Target", this.dataSource).subscribe(_Array => {
      
      let __Array = <any>_Array;
      
      if (__Array["Message"]) {
        this.openSnackBar(__Array["Message"], "");
      } else if ((<string>__Array).indexOf("Target has loaded successfully") != -1) {
        this.DoneMessage = __Array;
        this.done = true;
      } else {
        this.openSnackBar(__Array, "");
      }
      this.loading = false;
    });
  }

  CheckDubl(value, colname) {
    let count = 0;
    for (let index = 0; index < this.dataSource.length; index++) {
      const element = this.dataSource[index][colname];
      if (element == value) {
        count++;
      }
    }
    return count;
  }

}
