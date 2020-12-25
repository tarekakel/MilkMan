import { Injectable } from '@angular/core';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {
  blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  constructor() { }
  exportCustomExcelFile(
    excelFileName,
    for_date,
    _amount_sales,
    _amount_ret_sales,
    _amount_net_sales,
    _amount_offers,
    _count_sales,
    _count_ret_sales,
    _count_net_sales,
    _count_offers) {

    let character = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
    let Total_Sales = 0;
    let Total_Till = 0;
    let Total_MTD = 0;
    let Total_BDG = 0;
    var workbook = new Excel.Workbook();

    workbook.creator = "CS Information";
    workbook.lastModifiedBy = "CS Information";
    workbook.created = new Date();
    workbook.modified = new Date();

    var sheet_sales_amount = workbook.addWorksheet('Sales Amount');

    sheet_sales_amount.getColumn(1).width = 20;
    sheet_sales_amount.getColumn(2).width = 6;
    sheet_sales_amount.getColumn(3).width = 18;
    sheet_sales_amount.getColumn(5).width = 27;
    sheet_sales_amount.getColumn(6).width = 16;
    sheet_sales_amount.getColumn(7).width = 15;
    sheet_sales_amount.getColumn(8).width = 46;
    sheet_sales_amount.getColumn(9).width = 25;
    sheet_sales_amount.getColumn(10).width = 25;

    var title_sales_aomunt = sheet_sales_amount.getCell("A1");
    title_sales_aomunt.value = "Sales Report " + for_date;
    title_sales_aomunt.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '9ab9ed' },
      bgColor: { argb: '9ab9ed' }
    };
    title_sales_aomunt.font = {
      name: 'Calibri',
      color: { argb: '00000000' },
      family: 2,
      size: 20,
      italic: false,
      bold: true
    };
    sheet_sales_amount.mergeCells("A1:C1");

    sheet_sales_amount.getCell("A2").value = "CS Information & Analysis";
    sheet_sales_amount.getCell("A2").font = {
      name: 'Calibri',
      color: { argb: '00000000' },
      family: 2,
      size: 20,
      italic: false,
      bold: true
    };
    sheet_sales_amount.mergeCells("A2:C2");
    let space = 4;
    if (_amount_sales.length != 0) {

      //sales

      let _amount_sales_header = Object.keys(_amount_sales[0]);
      for (let index = 0; index < _amount_sales_header.length; index++) {
        let element = _amount_sales_header[index];
        if (element == "VMaterial_Code") {
          element = "Material Code";
        }
        if (element == "VMaterial_Name") {
          element = "Material Name";
        }
        if (element == "lastyear") {
          element = "Last Year";
        }
        let cell: any = sheet_sales_amount.getCell(character[index + 2] + space)
        cell.value = element;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        cell.font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      space = space + 1;
      for (let index = 0; index < _amount_sales.length; index++) {
        const element = _amount_sales[index];
        for (let j = 0; j < _amount_sales_header.length; j++) {
          const elementHeader = _amount_sales_header[j];
          sheet_sales_amount.getCell(character[j + 2] + (index + space)).value = element[elementHeader];

          if (elementHeader.indexOf("SALES") != -1) {
            Total_Sales = Total_Sales + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Till") != -1) {
            Total_Till = Total_Till + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("MTD") != -1) {
            Total_MTD = Total_MTD + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Budget") != -1) {
            Total_BDG = Total_BDG + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
        }
      }



      space = space + _amount_sales.length + 4;

      for (let index = 2; index <= 8; index++) {
        sheet_sales_amount.getCell(character[index] + (space - 4)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        sheet_sales_amount.getCell(character[index] + (space - 4)).font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      sheet_sales_amount.getCell("C" + (space - 4)).value = "Grand Total";
      sheet_sales_amount.getCell("E" + (space - 4)).value = Total_Sales;
      sheet_sales_amount.getCell("E" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("H" + (space - 4)).value = _amount_sales.length;
      sheet_sales_amount.getCell("H" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("F" + (space - 4)).value = Total_BDG;
      sheet_sales_amount.getCell("F" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("I" + (space - 4)).value = Total_MTD;
      sheet_sales_amount.getCell("I" + (space - 4)).numFmt = "#,##0";

      Total_Sales = 0;
      Total_Till = 0;
      Total_MTD = 0;Total_BDG = 0;;
    }

    //return sales
    if (_amount_ret_sales.length != 0) {
      let _amount_ret_sales_header = Object.keys(_amount_ret_sales[0]);
      for (let index = 0; index < _amount_ret_sales_header.length; index++) {
        let element = _amount_ret_sales_header[index];
        if (element == "VMaterial_Code") {
          element = "Material Code";
        }
        if (element == "VMaterial_Name") {
          element = "Material Name";
        }
        if (element == "lastyear") {
          element = "Last Year";
        }
        let cell: any = sheet_sales_amount.getCell(character[index + 2] + (space))
        cell.value = element;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        cell.font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      space = space + 1;
      for (let index = 0; index < _amount_ret_sales.length; index++) {
        const element = _amount_ret_sales[index];
        for (let j = 0; j < _amount_ret_sales_header.length; j++) {
          const elementHeader = _amount_ret_sales_header[j];
          sheet_sales_amount.getCell(character[j + 2] + (index + space)).value = element[elementHeader];
          if (elementHeader.indexOf("SALES") != -1) {
            Total_Sales = Total_Sales + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Till") != -1) {
            Total_Till = Total_Till + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("MTD") != -1) {
            Total_MTD = Total_MTD + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Budget") != -1) {
            Total_BDG = Total_BDG + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
        }
      }


      space = space + _amount_ret_sales.length + 4;
      for (let index = 2; index <= 8; index++) {
        sheet_sales_amount.getCell(character[index] + (space - 4)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        sheet_sales_amount.getCell(character[index] + (space - 4)).font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      sheet_sales_amount.getCell("C" + (space - 4)).value = "Grand Total";
      sheet_sales_amount.getCell("E" + (space - 4)).value = Total_Sales;
      sheet_sales_amount.getCell("E" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("H" + (space - 4)).value = _amount_ret_sales.length;
      sheet_sales_amount.getCell("H" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("F" + (space - 4)).value = Total_BDG;
      sheet_sales_amount.getCell("F" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("I" + (space - 4)).value = Total_MTD;
      sheet_sales_amount.getCell("I" + (space - 4)).numFmt = "#,##0";

      Total_Sales = 0;
      Total_Till = 0;
      Total_MTD = 0;Total_BDG = 0;;
    }


    //offers

    if (_amount_offers.length != 0) {
      let _amount_offers_header = Object.keys(_amount_offers[0]);
      for (let index = 0; index < _amount_offers_header.length; index++) {
        let element = _amount_offers_header[index];
        if (element == "VMaterial_Code") {
          element = "Material Code";
        }
        if (element == "VMaterial_Name") {
          element = "Material Name";
        }
        if (element == "lastyear") {
          element = "Last Year";
        }
        let cell: any = sheet_sales_amount.getCell(character[index + 2] + (space))
        cell.value = element;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        cell.font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      space = space + 1;
      for (let index = 0; index < _amount_offers.length; index++) {
        const element = _amount_offers[index];
        for (let j = 0; j < _amount_offers_header.length; j++) {
          const elementHeader = _amount_offers_header[j];
          sheet_sales_amount.getCell(character[j + 2] + (index + space)).value = element[elementHeader];
          if (elementHeader.indexOf("OFFER") != -1) {
            Total_Sales = Total_Sales + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Till") != -1) {
            Total_Till = Total_Till + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("MTD") != -1) {
            Total_MTD = Total_MTD + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Budget") != -1) {
            Total_BDG = Total_BDG + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
        }
      }

      space = space + _amount_offers.length + 4;

      for (let index = 2; index <= 8; index++) {
        sheet_sales_amount.getCell(character[index] + (space - 4)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        sheet_sales_amount.getCell(character[index] + (space - 4)).font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      sheet_sales_amount.getCell("C" + (space - 4)).value = "Grand Total";
      sheet_sales_amount.getCell("E" + (space - 4)).value = Total_Sales;
      sheet_sales_amount.getCell("E" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("H" + (space - 4)).value = _amount_offers.length;
      sheet_sales_amount.getCell("H" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("F" + (space - 4)).value = Total_BDG;
      sheet_sales_amount.getCell("F" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("I" + (space - 4)).value = Total_MTD;
      sheet_sales_amount.getCell("I" + (space - 4)).numFmt = "#,##0";

      Total_Sales = 0;
      Total_Till = 0;
      Total_MTD = 0;Total_BDG = 0;;
    }

    //net sales
    if (_amount_net_sales.length != 0) {

      let _amount_net_sales_header = Object.keys(_amount_net_sales[0]);
      for (let index = 0; index < _amount_net_sales_header.length; index++) {
        let element = _amount_net_sales_header[index];
        if (element == "VMaterial_Code") {
          element = "Material Code";
        }
        if (element == "VMaterial_Name") {
          element = "Material Name";
        }
        if (element == "lastyear") {
          element = "Last Year";
        }
        let cell: any = sheet_sales_amount.getCell(character[index + 2] + (space))
        cell.value = element;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        cell.font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      space = space + 1;
      for (let index = 0; index < _amount_net_sales.length; index++) {
        const element = _amount_net_sales[index];
        for (let j = 0; j < _amount_net_sales_header.length; j++) {
          const elementHeader = _amount_net_sales_header[j];
          sheet_sales_amount.getCell(character[j + 2] + (index + space)).value = element[elementHeader];

          if (elementHeader.indexOf("SALES") != -1) {
            Total_Sales = Total_Sales + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Till") != -1) {
            Total_Till = Total_Till + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("MTD") != -1) {
            Total_MTD = Total_MTD + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Budget") != -1) {
            Total_BDG = Total_BDG + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
        }
      }


      space = space + _amount_net_sales.length + 4;
      for (let index = 2; index <= 8; index++) {
        sheet_sales_amount.getCell(character[index] + (space - 4)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        sheet_sales_amount.getCell(character[index] + (space - 4)).font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      sheet_sales_amount.getCell("C" + (space - 4)).value = "Grand Total";
      sheet_sales_amount.getCell("E" + (space - 4)).value = Total_Sales;
      sheet_sales_amount.getCell("E" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("H" + (space - 4)).value = _amount_net_sales.length;
      sheet_sales_amount.getCell("H" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("F" + (space - 4)).value = Total_BDG;
      sheet_sales_amount.getCell("F" + (space - 4)).numFmt = "#,##0";
      sheet_sales_amount.getCell("I" + (space - 4)).value = Total_MTD;
      sheet_sales_amount.getCell("I" + (space - 4)).numFmt = "#,##0";

      Total_Sales = 0;
      Total_Till = 0;
      Total_MTD = 0;Total_BDG = 0;;

    }
    //------------Count


    var sheet_sales_count = workbook.addWorksheet('Sales Item Count');

    sheet_sales_count.getColumn(1).width = 20;
    sheet_sales_count.getColumn(2).width = 6;
    sheet_sales_count.getColumn(3).width = 18;
    sheet_sales_count.getColumn(5).width = 27;
    sheet_sales_count.getColumn(6).width = 16;
    sheet_sales_count.getColumn(7).width = 15;
    sheet_sales_count.getColumn(8).width = 46;
    sheet_sales_count.getColumn(9).width = 25;
    sheet_sales_count.getColumn(10).width = 25;

    var title_sales_aomunt = sheet_sales_count.getCell("A1");
    title_sales_aomunt.value = "Sales Report " + for_date;
    title_sales_aomunt.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '9ab9ed' },
      bgColor: { argb: '9ab9ed' }
    };
    title_sales_aomunt.font = {
      name: 'Calibri',
      color: { argb: '00000000' },
      family: 2,
      size: 20,
      italic: false,
      bold: true
    };
    sheet_sales_count.mergeCells("A1:C1");
    sheet_sales_count.getCell("A2").value = "CS Information & Analysis";
    sheet_sales_count.getCell("A2").font = {
      name: 'Calibri',
      color: { argb: '00000000' },
      family: 2,
      size: 20,
      italic: false,
      bold: true
    };
    sheet_sales_count.mergeCells("A2:C2");

    space = 4;

    //sales
    if (_count_sales.length != 0) {
      let _count_sales_header = Object.keys(_count_sales[0]);
      for (let index = 0; index < _count_sales_header.length; index++) {
        let element = _count_sales_header[index];
        if (element == "VMaterial_Code") {
          element = "Material Code";
        }
        if (element == "VMaterial_Name") {
          element = "Material Name";
        }
        if (element == "lastyear") {
          element = "Last Year";
        }
        let cell: any = sheet_sales_count.getCell(character[index + 2] + space)
        cell.value = element;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        cell.font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      space = space + 1;
      for (let index = 0; index < _count_sales.length; index++) {
        const element = _count_sales[index];
        for (let j = 0; j < _count_sales_header.length; j++) {
          const elementHeader = _count_sales_header[j];
          sheet_sales_count.getCell(character[j + 2] + (index + space)).value = element[elementHeader];
          if (elementHeader.indexOf("SALES") != -1) {
            Total_Sales = Total_Sales + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Till") != -1) {
            Total_Till = Total_Till + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("MTD") != -1) {
            Total_MTD = Total_MTD + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Budget") != -1) {
            Total_BDG = Total_BDG + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
        }
      }


      space = space + _count_sales.length + 4;
      for (let index = 2; index <= 8; index++) {
        sheet_sales_count.getCell(character[index] + (space - 4)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        sheet_sales_count.getCell(character[index] + (space - 4)).font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      sheet_sales_count.getCell("C" + (space - 4)).value = "Grand Total";
      sheet_sales_count.getCell("E" + (space - 4)).value = Total_Sales;
      sheet_sales_count.getCell("E" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("H" + (space - 4)).value = _count_sales.length;
      sheet_sales_count.getCell("H" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("F" + (space - 4)).value = Total_BDG;
      sheet_sales_count.getCell("F" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("I" + (space - 4)).value = Total_MTD;
      sheet_sales_count.getCell("I" + (space - 4)).numFmt = "#,##0";

      Total_Sales = 0;
      Total_Till = 0;
      Total_MTD = 0;Total_BDG = 0;
    }

    //return sales
    if (_count_ret_sales.length != 0) {
      let _count_ret_sales_header = Object.keys(_count_ret_sales[0]);
      for (let index = 0; index < _count_ret_sales_header.length; index++) {
        let element = _count_ret_sales_header[index];
        if (element == "VMaterial_Code") {
          element = "Material Code";
        }
        if (element == "VMaterial_Name") {
          element = "Material Name";
        }
        if (element == "lastyear") {
          element = "Last Year";
        }
        let cell: any = sheet_sales_count.getCell(character[index + 2] + (space))
        cell.value = element;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        cell.font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      space = space + 1;
      for (let index = 0; index < _count_ret_sales.length; index++) {
        const element = _count_ret_sales[index];
        for (let j = 0; j < _count_ret_sales_header.length; j++) {
          const elementHeader = _count_ret_sales_header[j];
          sheet_sales_count.getCell(character[j + 2] + (index + space)).value = element[elementHeader];
          if (elementHeader.indexOf("SALES") != -1) {
            Total_Sales = Total_Sales + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Till") != -1) {
            Total_Till = Total_Till + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("MTD") != -1) {
            Total_MTD = Total_MTD + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Budget") != -1) {
            Total_BDG = Total_BDG + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
        }
      }


      space = space + _count_ret_sales.length + 4;
      for (let index = 2; index <= 8; index++) {
        sheet_sales_count.getCell(character[index] + (space - 4)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        sheet_sales_count.getCell(character[index] + (space - 4)).font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      sheet_sales_count.getCell("C" + (space - 4)).value = "Grand Total";
      sheet_sales_count.getCell("E" + (space - 4)).value = Total_Sales;
      sheet_sales_count.getCell("E" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("H" + (space - 4)).value = _count_ret_sales.length;
      sheet_sales_count.getCell("H" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("F" + (space - 4)).value = Total_BDG;
      sheet_sales_count.getCell("F" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("I" + (space - 4)).value = Total_MTD;
      sheet_sales_count.getCell("I" + (space - 4)).numFmt = "#,##0";

      Total_Sales = 0;
      Total_Till = 0;
      Total_MTD = 0;Total_BDG = 0;;
    }
    
    //offers
    if (_count_offers.length != 0) {
      let _count_offers_header = Object.keys(_count_offers[0]);
      for (let index = 0; index < _count_offers_header.length; index++) {
        let element = _count_offers_header[index];
        if (element == "VMaterial_Code") {
          element = "Material Code";
        }
        if (element == "VMaterial_Name") {
          element = "Material Name";
        }
        if (element == "lastyear") {
          element = "Last Year";
        }
        let cell: any = sheet_sales_count.getCell(character[index + 2] + (space))
        cell.value = element;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        cell.font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      space = space + 1;
      for (let index = 0; index < _count_offers.length; index++) {
        const element = _count_offers[index];
        for (let j = 0; j < _count_offers_header.length; j++) {
          const elementHeader = _count_offers_header[j];
          sheet_sales_count.getCell(character[j + 2] + (index + space)).value = element[elementHeader];
          if (elementHeader.indexOf("OFFER") != -1) {
            Total_Sales = Total_Sales + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Till") != -1) {
            Total_Till = Total_Till + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("MTD") != -1) {
            Total_MTD = Total_MTD + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Budget") != -1) {
            Total_BDG = Total_BDG + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
        }
      }

      space = space + _count_offers.length + 4;


      for (let index = 2; index <= 8; index++) {
        sheet_sales_count.getCell(character[index] + (space - 4)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        sheet_sales_count.getCell(character[index] + (space - 4)).font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      sheet_sales_count.getCell("C" + (space - 4)).value = "Grand Total";
      sheet_sales_count.getCell("E" + (space - 4)).value = Total_Sales;
      sheet_sales_count.getCell("E" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("H" + (space - 4)).value = _count_offers.length;
      sheet_sales_count.getCell("H" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("F" + (space - 4)).value = Total_BDG;
      sheet_sales_count.getCell("F" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("I" + (space - 4)).value = Total_MTD;
      sheet_sales_count.getCell("I" + (space - 4)).numFmt = "#,##0";

      Total_Sales = 0;
      Total_Till = 0;
      Total_MTD = 0;Total_BDG = 0;;
    }

    //net sales
    if (_count_net_sales.length != 0) {
      let _count_net_sales_header = Object.keys(_count_net_sales[0]);
      for (let index = 0; index < _count_net_sales_header.length; index++) {
        let element = _count_net_sales_header[index];
        if (element == "VMaterial_Code") {
          element = "Material Code";
        }
        if (element == "VMaterial_Name") {
          element = "Material Name";
        }
        if (element == "lastyear") {
          element = "Last Year";
        }
        let cell: any = sheet_sales_count.getCell(character[index + 2] + (space))
        cell.value = element;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        cell.font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      space = space + 1;
      for (let index = 0; index < _count_net_sales.length; index++) {
        const element = _count_net_sales[index];
        for (let j = 0; j < _count_net_sales_header.length; j++) {
          const elementHeader = _count_net_sales_header[j];
          sheet_sales_count.getCell(character[j + 2] + (index + space)).value = element[elementHeader];
          if (elementHeader.indexOf("SALES") != -1) {
            Total_Sales = Total_Sales + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Till") != -1) {
            Total_Till = Total_Till + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("MTD") != -1) {
            Total_MTD = Total_MTD + element[elementHeader];
            sheet_sales_count.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
          if (elementHeader.indexOf("Budget") != -1) {
            Total_BDG = Total_BDG + element[elementHeader];
            sheet_sales_amount.getCell(character[j + 2] + (index + space)).numFmt = "#,##0";
          }
        }
      }


      space = space + _count_net_sales.length + 4;
      for (let index = 2; index <= 8; index++) {
        sheet_sales_count.getCell(character[index] + (space - 4)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9ab9ed' },
          bgColor: { argb: '9ab9ed' }
        };
        sheet_sales_count.getCell(character[index] + (space - 4)).font = {
          name: 'Calibri',
          color: { argb: '00000000' },
          family: 2,
          size: 12,
          italic: false,
          bold: true
        };
      }

      sheet_sales_count.getCell("C" + (space - 4)).value = "Grand Total";
      sheet_sales_count.getCell("E" + (space - 4)).value = Total_Sales;
      sheet_sales_count.getCell("E" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("H" + (space - 4)).value = _count_net_sales.length;
      sheet_sales_count.getCell("H" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("F" + (space - 4)).value = Total_BDG;
      sheet_sales_count.getCell("F" + (space - 4)).numFmt = "#,##0";
      sheet_sales_count.getCell("I" + (space - 4)).value = Total_MTD;
      sheet_sales_count.getCell("I" + (space - 4)).numFmt = "#,##0";

      Total_Sales = 0;
      Total_Till = 0;
      Total_MTD = 0;Total_BDG = 0;;
    }

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: this.blobType });
      FileSaver.saveAs(blob, excelFileName);
    });
  }
}
