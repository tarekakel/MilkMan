import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualTargetMonthTableComponent } from './actual-target-month-table.component';

describe('ActualTargetMonthTableComponent', () => {
  let component: ActualTargetMonthTableComponent;
  let fixture: ComponentFixture<ActualTargetMonthTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualTargetMonthTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualTargetMonthTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
