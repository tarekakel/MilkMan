import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualTargetComponent } from './actual-target.component';

describe('ActualTargetComponent', () => {
  let component: ActualTargetComponent;
  let fixture: ComponentFixture<ActualTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
