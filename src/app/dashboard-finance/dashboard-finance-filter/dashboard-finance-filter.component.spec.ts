import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFinanceFilterComponent } from './dashboard-finance-filter.component';

describe('DashboardFinanceFilterComponent', () => {
  let component: DashboardFinanceFilterComponent;
  let fixture: ComponentFixture<DashboardFinanceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFinanceFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFinanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
