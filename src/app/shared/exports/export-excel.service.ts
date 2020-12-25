import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx/xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  worksheet: XLSX.WorkSheet;
  workbook: XLSX.WorkBook;

  constructor() { }

  private CreateExcelFile(Data: any) {
    this.worksheet = XLSX.utils.json_to_sheet(Data);
    this.workbook = {
      Sheets: {
        'data': this.worksheet
      }, SheetNames: ['data']
    };
  }


  public saveExcelFile(Data: any,fileName: string) {
    this.CreateExcelFile(Data);
    /* bookType can be any supported output type */
    var wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };

    var wbout = XLSX.write(this.workbook, wopts);
    FileSaver.saveAs(new Blob([wbout], { type: "application/octet-stream" }),(fileName + '.xlsx'));
  }
}
