import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFiltersComponent } from './sales-filters.component';

describe('SalesFiltersComponent', () => {
  let component: SalesFiltersComponent;
  let fixture: ComponentFixture<SalesFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
