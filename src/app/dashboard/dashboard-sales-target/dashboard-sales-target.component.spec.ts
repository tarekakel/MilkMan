import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalesTargetComponent } from './dashboard-sales-target.component';

describe('DashboardSalesTargetComponent', () => {
  let component: DashboardSalesTargetComponent;
  let fixture: ComponentFixture<DashboardSalesTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSalesTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSalesTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
