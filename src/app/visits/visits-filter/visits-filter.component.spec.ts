import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsFilterComponent } from './visits-filter.component';

describe('VisitsFilterComponent', () => {
  let component: VisitsFilterComponent;
  let fixture: ComponentFixture<VisitsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
