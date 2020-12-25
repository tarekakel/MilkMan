import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordTopTableComponent } from './dashbord-top-table.component';

describe('DashbordTopTableComponent', () => {
  let component: DashbordTopTableComponent;
  let fixture: ComponentFixture<DashbordTopTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordTopTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordTopTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
