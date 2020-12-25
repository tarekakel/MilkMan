import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFinanceTableComponent } from './dashboard-finance-table.component';

describe('DashboardFinanceTableComponent', () => {
  let component: DashboardFinanceTableComponent;
  let fixture: ComponentFixture<DashboardFinanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFinanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFinanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
