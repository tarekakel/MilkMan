import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualTargetHeadTableComponent } from './actual-target-head-table.component';

describe('ActualTargetHeadTableComponent', () => {
  let component: ActualTargetHeadTableComponent;
  let fixture: ComponentFixture<ActualTargetHeadTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualTargetHeadTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualTargetHeadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
