import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordVisitTableComponent } from './dashbord-visit-table.component';

describe('DashbordVisitTableComponent', () => {
  let component: DashbordVisitTableComponent;
  let fixture: ComponentFixture<DashbordVisitTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordVisitTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordVisitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
