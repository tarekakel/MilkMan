import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nvd3MultiChartComponent } from './nvd3-multi-chart.component';

describe('Nvd3MultiChartComponent', () => {
  let component: Nvd3MultiChartComponent;
  let fixture: ComponentFixture<Nvd3MultiChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nvd3MultiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nvd3MultiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
