import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceTableComponent } from './variance-table.component';

describe('VarianceTableComponent', () => {
  let component: VarianceTableComponent;
  let fixture: ComponentFixture<VarianceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarianceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarianceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
