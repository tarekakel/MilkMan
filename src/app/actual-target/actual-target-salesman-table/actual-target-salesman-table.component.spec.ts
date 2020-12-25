import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualTargetSalesmanTableComponent } from './actual-target-salesman-table.component';

describe('ActualTargetSalesmanTableComponent', () => {
  let component: ActualTargetSalesmanTableComponent;
  let fixture: ComponentFixture<ActualTargetSalesmanTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualTargetSalesmanTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualTargetSalesmanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
