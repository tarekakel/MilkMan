import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InvoiceDialogData, DialogCustomersSearchInvoiceComponent } from './dialog-customers-search-invoice/dialog-customers-search-invoice.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  CityNames = [];
  SalesMans = [];
  ShopNames = [];
  AreaNames = [];
  AreaName = "";
  CityName = "";
  ShopName = "";
  Duration = "";
  SalesMan = "";
  constructor(public dialog: MatDialog,private getDataService: GetDataService) { }


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1486px';
    dialogConfig.height = '550px'
    dialogConfig.data = null;
    this.dialog.open(DialogCustomersSearchInvoiceComponent, dialogConfig);
  }

  ngOnInit() {
    let x = this;
    this.getDataService.getJson('sales').subscribe(_Array => {

      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = <Array<any>>_Array[index];
        temp.push({ name: element["City"], id: element["City"] });
      }
      x.CityNames = temp;
    });
    this.getDataService.getJson('salesMan').subscribe(_Array => {
      let __Array = <Array<any>>_Array;
      let temp = [];

      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < __Array.length; index++) {
        const element = __Array[index];
        temp.push({ name: element["SalesMan"], id: element["SalesMan"] });
      }
      x.SalesMans = temp;
    });
    


    x.AreaNames.push({ name: 'ALL', id: '' });
    x.ShopNames.push({ name: 'ALL', id: '' });
  }


  selectCity(value) {

    let x = this;
    x.CityName = value.id;
    x.AreaNames = [...[]];
    x.AreaName = '';
    x.ShopNames = [...[]];
    x.ShopName = '';
    x.getDataService.getJson('sales?next={"city":"' + x.CityName + '"}').subscribe(_Array => {
      let temp = [];
      temp.push({ name: 'ALL', id: '' });
      for (let index = 0; index < (<Array<any>>_Array).length; index++) {
        const element = <Array<any>>_Array[index];
        temp.push({ name: element["area"], id: element["area"] });
      }
      x.AreaNames = temp;
    });
    x.ShopNames.push({ name: 'ALL', id: '' });
  }

  selectArea(value) {
    let x = this;
    x.AreaName = value.id;
    x.ShopNames = [...[]];
    x.ShopName = '';
    if (value.id)
      x.getDataService.getJson('sales?next={"city":"' + x.CityName + '","area":"' + x.AreaName + '"}').subscribe(_Array => {
        let temp = [];
        temp.push({ name: 'ALL', id: '' });
        for (let index = 0; index < (<Array<any>>_Array).length; index++) {
          const element = <Array<any>>_Array[index];
          temp.push({ name: element["Account_Name"], id: element["Account_Name"] });
        }
        x.ShopNames = temp;
      });
    x.ShopNames.push({ name: 'ALL', id: '' });
  }

  selectShop(value) {
    this.ShopName = value.id;
  }

  selectSalesMan( value){
    this.SalesMan = value.id;
  }
  selectOrderBy(value){

  }
}
