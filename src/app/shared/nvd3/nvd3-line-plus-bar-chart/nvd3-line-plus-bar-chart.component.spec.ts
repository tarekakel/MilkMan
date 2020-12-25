import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nvd3LinePlusBarChartComponent } from './nvd3-line-plus-bar-chart.component';

describe('Nvd3LinePlusBarChartComponent', () => {
  let component: Nvd3LinePlusBarChartComponent;
  let fixture: ComponentFixture<Nvd3LinePlusBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nvd3LinePlusBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nvd3LinePlusBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
