import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nvd3LineChartComponent } from './nvd3-line-chart.component';

describe('Nvd3LineChartComponent', () => {
  let component: Nvd3LineChartComponent;
  let fixture: ComponentFixture<Nvd3LineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nvd3LineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nvd3LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
