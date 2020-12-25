import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalesChartComponent } from './dialog-sales-chart.component';

describe('DialogSalesChartComponent', () => {
  let component: DialogSalesChartComponent;
  let fixture: ComponentFixture<DialogSalesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSalesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
