import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nvd3DonutChartComponent } from './nvd3-donut-chart.component';

describe('Nvd3DonutChartComponent', () => {
  let component: Nvd3DonutChartComponent;
  let fixture: ComponentFixture<Nvd3DonutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nvd3DonutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nvd3DonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
