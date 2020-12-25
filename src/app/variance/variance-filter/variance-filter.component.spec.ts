import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceFilterComponent } from './variance-filter.component';

describe('VarianceFilterComponent', () => {
  let component: VarianceFilterComponent;
  let fixture: ComponentFixture<VarianceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarianceFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarianceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
