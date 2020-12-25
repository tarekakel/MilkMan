import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Papa } from 'ngx-papaparse';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-xlsx-reader',
  templateUrl: './xlsx-reader.component.html',
  styleUrls: ['./xlsx-reader.component.css']
})
export class XlsxReaderComponent {
  data;

  @ViewChild('Input_file') Input_file: ElementRef;
  @Output() ReadingData: EventEmitter<any> = new EventEmitter();
  @Input() disabled = false;
  filename = "";
  constructor(private papa: Papa ) {}
  /*   parse(files: FileList): void {
  //   const file: File = files.item(0);
  //   const reader: FileReader = new FileReader();
  //   reader.readAsText(file);
  //   reader.onload = e => {
  //     const csv : string = <string>reader.result;
  //     this.papa.parse(csv, {
  //       skipEmptyLines: true,
  //       complete: (results, file) => {
  //         console.log('Parsed', results, file);
  //       }
  //     });
  //   }
  // }*/
  
 
  onFileChange(evt: any) {
    let temp = [];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      //console.log(this.data);
      
      for (let index = 1; index < this.data.length; index++) {
        const array = this.data[index];
        let objTemp = {};
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          objTemp[this.data[0][index]] = element;
        }
        temp.push(objTemp);
      }
      this.filename = target.files[0].name;
      this.ReadingData.emit(temp);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  
  clear(){
    this.filename = "";
    this.Input_file.nativeElement.value = "";
  }
}
