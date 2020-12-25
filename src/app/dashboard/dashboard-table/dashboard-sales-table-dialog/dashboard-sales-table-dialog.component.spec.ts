import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalesTableDialogComponent } from './dashboard-sales-table-dialog.component';

describe('DashboardSalesTableDialogComponent', () => {
  let component: DashboardSalesTableDialogComponent;
  let fixture: ComponentFixture<DashboardSalesTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSalesTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSalesTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
