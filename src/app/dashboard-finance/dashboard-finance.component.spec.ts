import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFinanceComponent } from './dashboard-finance.component';

describe('DashboardFinanceComponent', () => {
  let component: DashboardFinanceComponent;
  let fixture: ComponentFixture<DashboardFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
