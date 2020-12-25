import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSalesComponent } from './compare-sales.component';

describe('CompareSalesComponent', () => {
  let component: CompareSalesComponent;
  let fixture: ComponentFixture<CompareSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
