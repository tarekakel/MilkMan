import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMonthSalesChartComponent } from './dashboard-month-sales-chart.component';

describe('DashboardMonthSalesChartComponent', () => {
  let component: DashboardMonthSalesChartComponent;
  let fixture: ComponentFixture<DashboardMonthSalesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMonthSalesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMonthSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
