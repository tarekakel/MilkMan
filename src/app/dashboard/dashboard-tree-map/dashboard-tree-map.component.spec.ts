import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTreeMapComponent } from './dashboard-tree-map.component';

describe('DashboardTreeMapComponent', () => {
  let component: DashboardTreeMapComponent;
  let fixture: ComponentFixture<DashboardTreeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTreeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTreeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
