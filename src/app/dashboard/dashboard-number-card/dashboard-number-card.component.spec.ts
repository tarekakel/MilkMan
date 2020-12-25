import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNumberCardComponent } from './dashboard-number-card.component';

describe('DashboardNumberCardComponent', () => {
  let component: DashboardNumberCardComponent;
  let fixture: ComponentFixture<DashboardNumberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNumberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
