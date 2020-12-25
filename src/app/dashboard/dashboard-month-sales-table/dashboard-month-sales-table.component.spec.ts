import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMonthSalesTableComponent } from './dashboard-month-sales-table.component';

describe('DashboardMonthSalesTableComponent', () => {
  let component: DashboardMonthSalesTableComponent;
  let fixture: ComponentFixture<DashboardMonthSalesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMonthSalesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMonthSalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
