import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesHierarchyComponent } from './sales-hierarchy.component';

describe('SalesHierarchyComponent', () => {
  let component: SalesHierarchyComponent;
  let fixture: ComponentFixture<SalesHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
