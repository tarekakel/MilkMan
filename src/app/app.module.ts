import { BrowserModule } from '@angular/platform-browser';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

import { NgModule } from '@angular/core';

//material package
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSlideToggleModule, MatRadioModule, MatCardModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatTreeModule, MatTooltipModule, MatTabsModule, MatTableModule, MatStepperModule, MatSortModule, MatSnackBarModule, MatFormFieldModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

//hammerjs package
import 'hammerjs';

//ngx-charts package
import { NgxChartsModule, TreeMapModule, PieGridComponent } from '@swimlane/ngx-charts';

//component application
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';
import { CustomReuseStrategy } from './reuse-strategy';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardFiltersComponent } from './dashboard/dashboard-filters/dashboard-filters.component';
import { DashboardTreeMapComponent } from './dashboard/dashboard-tree-map/dashboard-tree-map.component';
import { DashboardNumberCardComponent } from './dashboard/dashboard-number-card/dashboard-number-card.component';
import { DashboardTableComponent } from './dashboard/dashboard-table/dashboard-table.component';
import { FilterOnForPipe } from './filter-on-for.pipe';
import { GetDateService } from './shared/get-date.service';
import { DashboardSalesChartComponent } from './dashboard/dashboard-sales-chart/dashboard-sales-chart.component';
import { SalesComponent } from './sales/sales.component';
import { SalesFiltersComponent } from './sales/sales-filters/sales-filters.component';
import { DashboardMonthSalesTableComponent } from './dashboard/dashboard-month-sales-table/dashboard-month-sales-table.component';
import { DashboardMonthSalesChartComponent } from './dashboard/dashboard-month-sales-chart/dashboard-month-sales-chart.component';
import { OrderByPipe } from './shared/order-by.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectFilterComponent } from './shared/tools/mat-select-filter/mat-select-filter.component';
import { CompareSalesComponent } from './compare/compare-sales/compare-sales.component';
import { SpaceComponent } from './shared/tools/space/space.component';
import { DynamicTableComponent } from './shared/tools/dynamic-table/dynamic-table.component';
import { DialogSalesChartComponent } from './sales/dialog-sales-chart/dialog-sales-chart.component';
import { PieChartComponent } from './shared/chartjs/pie-chart/pie-chart.component';
import { ComboChartComponent } from './shared/ngx-charts/combo-chart/combo-chart.component';

import { ComboSeriesVerticalComponent } from 'src/app/shared/ngx-charts/combo-chart/combo-series-vertical.component';
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';
import { NvD3Module } from 'ng2-nvd3';

import { Nvd3LineChartComponent } from './shared/nvd3/nvd3-line-chart/nvd3-line-chart.component';
import { Nvd3MultiChartComponent } from './shared/nvd3/nvd3-multi-chart/nvd3-multi-chart.component';
import { DashbordTopTableComponent } from './dashboard/dashbord-top-table/dashbord-top-table.component';
import { DashbordTopChartComponent } from './dashboard/dashbord-top-chart/dashbord-top-chart.component';
import { XlsxReaderComponent } from './shared/xlsx-reader/xlsx-reader.component';
import { PapaParseModule } from 'ngx-papaparse';
import { NgxUploaderModule } from 'ngx-uploader';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadTargetComponent } from './upload-target/upload-target.component';
import { DialogEditTargetComponent } from './upload-target/dialog-edit-target/dialog-edit-target.component';
import { SalesHierarchyComponent } from './sales-hierarchy/sales-hierarchy.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { Nvd3LinePlusBarChartComponent } from './shared/nvd3/nvd3-line-plus-bar-chart/nvd3-line-plus-bar-chart.component';
import { DashboardDialogCardComponent } from './dashboard/dashboard-number-card/dashboard-dialog-card/dashboard-dialog-card.component';
import { SalesFavoriteMaterialsComponent } from './sales-favorite-materials/sales-favorite-materials.component';
import { Nvd3DonutChartComponent } from './shared/nvd3/nvd3-donut-chart/nvd3-donut-chart.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { CountoModule } from 'angular2-counto';
import { RoundPipe } from './shared/round.pipe';
import { Nvd3PieChartComponent } from './shared/nvd3/nvd3-pie-chart/nvd3-pie-chart.component';
import { CustomersTableComponent } from './customers/customers-table/customers-table.component';
import { CustomersComponent } from './customers/customers.component';
import { DialogCustomerInvoiceComponent } from './customers/customers-table/dialog-customer-invoice/dialog-customer-invoice.component';
import { DialogCustomersSearchInvoiceComponent } from './customers/dialog-customers-search-invoice/dialog-customers-search-invoice.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitsFilterComponent } from './visits/visits-filter/visits-filter.component';
import { DashbordVisitTableComponent } from './dashboard/dashbord-visit-table/dashbord-visit-table.component';
import { DashbordVisitChartComponent } from './dashboard/dashbord-visit-chart/dashbord-visit-chart.component';
import { DashboardSalesTableDialogComponent } from './dashboard/dashboard-table/dashboard-sales-table-dialog/dashboard-sales-table-dialog.component';
import { DashboardSalesTableMonthDialogComponent } from './dashboard/dashboard-month-sales-table/dashboard-sales-table-month-dialog/dashboard-sales-table-month-dialog.component';
import { SecondsToHhmmssPipe } from './shared/seconds-to-hhmmss.pipe';
import { ActualTargetComponent } from './actual-target/actual-target.component';
import { ActualTargetMonthTableComponent } from './actual-target/actual-target-month-table/actual-target-month-table.component';
import { ActualTargetCityTableComponent } from './actual-target/actual-target-city-table/actual-target-city-table.component';
import { ActualTargetHeadTableComponent } from './actual-target/actual-target-head-table/actual-target-head-table.component';
import { ActualTargetSalesmanTableComponent } from './actual-target/actual-target-salesman-table/actual-target-salesman-table.component';
import { DialogCustomerVisitsComponent } from './customers/customers-table/dialog-customer-visits/dialog-customer-visits.component';
import { VarianceComponent } from './variance/variance.component';
import { VarianceTableComponent } from './variance/variance-table/variance-table.component';
import { VarianceFilterComponent } from './variance/variance-filter/variance-filter.component';
import { OrderModule } from 'ngx-order-pipe';
import { DashboardFinanceComponent } from './dashboard-finance/dashboard-finance.component';
import { DashboardFinanceFilterComponent } from './dashboard-finance/dashboard-finance-filter/dashboard-finance-filter.component';
import { DashboardFinanceTableComponent } from './dashboard-finance/dashboard-finance-table/dashboard-finance-table.component';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
import { ExportExcelService } from 'src/app/shared/exports/export-excel.service';
import { DashboardSalesTargetComponent } from './dashboard/dashboard-sales-target/dashboard-sales-target.component';
import { DashboardSalesTargetChartComponent } from './dashboard/dashboard-sales-target-chart/dashboard-sales-target-chart.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};


export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard', key: 'custom_key1' }
  },
  {
    path: 'sales',
    component: SalesComponent,
    data: { title: 'Sales', key: 'custom_key2' }
  },
  {
    path: 'upload-target',
    component: UploadTargetComponent,
    data: { title: 'Upload Target', key: 'custom_key3' }
  },
  {
    path: 'compare-sales',
    component: CompareSalesComponent,
    data: { title: 'Comparison', key: 'custom_key4' }
  },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { title: 'Customers', key: 'custom_key5' }
  },
  {
    path: 'visits',
    component: VisitsComponent,
    data: { title: 'Visits', key: 'custom_key6' }
  },
  {
    path: 'test',
    component: VisitsComponent,
    data: { title: 'test page', key: 'c' }
  }, 
  {
    path: 'actual-target',
    component: ActualTargetComponent,
    data: { title: 'Actual & Target', key: 'custom_key8' }
  },
  {
    path: 'variance',
    component: VarianceComponent,
    data: { title: 'Variance', key: 'custom_key9' }
  },
  {
    path: 'dashboard-finance',
    component: DashboardFinanceComponent,
    data: { title: 'Finance', key: 'custom_key10' }
  },
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, data: { key: 'custom_key' } }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    DashboardFiltersComponent,
    DashboardTreeMapComponent,
    DashboardNumberCardComponent,
    DashboardTableComponent,
    FilterOnForPipe,
    DashboardSalesChartComponent,
    SalesComponent,
    SalesFiltersComponent,
    DashboardMonthSalesTableComponent,
    DashboardMonthSalesChartComponent,
    OrderByPipe,
    MatSelectFilterComponent,
    CompareSalesComponent,
    SpaceComponent,
    DynamicTableComponent,
    DialogSalesChartComponent,
    PieChartComponent,
    ComboSeriesVerticalComponent,
    ComboChartComponent,
    Nvd3LineChartComponent,
    Nvd3MultiChartComponent,
    DashbordTopTableComponent,
    DashbordTopChartComponent,
    XlsxReaderComponent,
    UploadTargetComponent,
    DialogEditTargetComponent,
    SalesHierarchyComponent,
    Nvd3LinePlusBarChartComponent,
    DashboardDialogCardComponent,
    SalesFavoriteMaterialsComponent,
    Nvd3DonutChartComponent,
    RoundPipe,
    Nvd3PieChartComponent,
    CustomersTableComponent,
    CustomersComponent,
    DialogCustomerInvoiceComponent,
    DialogCustomersSearchInvoiceComponent,
    VisitsComponent,
    VisitsFilterComponent,
    DashbordVisitTableComponent,
    DashbordVisitChartComponent,
    DashboardSalesTableDialogComponent,
    DashboardSalesTableMonthDialogComponent,
    SecondsToHhmmssPipe,
    ActualTargetComponent,
    ActualTargetMonthTableComponent,
    ActualTargetCityTableComponent,
    ActualTargetHeadTableComponent,
    ActualTargetSalesmanTableComponent,
    DialogCustomerVisitsComponent,
    VarianceComponent,
    VarianceTableComponent,
    VarianceFilterComponent,
    DashboardFinanceComponent,
    DashboardFinanceFilterComponent,
    DashboardFinanceTableComponent,
    DashboardSalesTargetComponent,
    DashboardSalesTargetChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    OrderModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxChartsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    NvD3Module,
    PapaParseModule,
    NgxUploaderModule,
    FileUploadModule,
    TreeMapModule,
    DragScrollModule,
    CountoModule,
    ContextMenuModule.forRoot()
  ],
  entryComponents: [DialogSalesChartComponent,
    DashboardDialogCardComponent,
    DialogCustomerInvoiceComponent,
    DialogCustomersSearchInvoiceComponent,
    DashboardSalesTableDialogComponent,
    DashboardSalesTableMonthDialogComponent,
    DialogCustomerVisitsComponent],
  providers: [
    ExportExcelService,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    GetDateService, OrderByPipe],
  bootstrap: [AppComponent]
})
export class AppModule {

}

