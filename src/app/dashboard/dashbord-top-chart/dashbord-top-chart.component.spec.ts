import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordTopChartComponent } from './dashbord-top-chart.component';

describe('DashbordTopChartComponent', () => {
  let component: DashbordTopChartComponent;
  let fixture: ComponentFixture<DashbordTopChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordTopChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordTopChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
