import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalesTableMonthDialogComponent } from './dashboard-sales-table-month-dialog.component';

describe('DashboardSalesTableMonthDialogComponent', () => {
  let component: DashboardSalesTableMonthDialogComponent;
  let fixture: ComponentFixture<DashboardSalesTableMonthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSalesTableMonthDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSalesTableMonthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
