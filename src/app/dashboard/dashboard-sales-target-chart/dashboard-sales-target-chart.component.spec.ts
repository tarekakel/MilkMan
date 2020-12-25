import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalesTargetChartComponent } from './dashboard-sales-target-chart.component';

describe('DashboardSalesTargetChartComponent', () => {
  let component: DashboardSalesTargetChartComponent;
  let fixture: ComponentFixture<DashboardSalesTargetChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSalesTargetChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSalesTargetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
