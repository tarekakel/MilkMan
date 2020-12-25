import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualTargetCityTableComponent } from './actual-target-city-table.component';

describe('ActualTargetCityTableComponent', () => {
  let component: ActualTargetCityTableComponent;
  let fixture: ComponentFixture<ActualTargetCityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualTargetCityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualTargetCityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
