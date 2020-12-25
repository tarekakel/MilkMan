import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nvd3PieChartComponent } from './nvd3-pie-chart.component';

describe('Nvd3PieChartComponent', () => {
  let component: Nvd3PieChartComponent;
  let fixture: ComponentFixture<Nvd3PieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nvd3PieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nvd3PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
