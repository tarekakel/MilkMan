import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordVisitChartComponent } from './dashbord-visit-chart.component';

describe('DashbordVisitChartComponent', () => {
  let component: DashbordVisitChartComponent;
  let fixture: ComponentFixture<DashbordVisitChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordVisitChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordVisitChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
