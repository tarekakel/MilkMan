import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomerVisitsComponent } from './dialog-customer-visits.component';

describe('DialogCustomerVisitsComponent', () => {
  let component: DialogCustomerVisitsComponent;
  let fixture: ComponentFixture<DialogCustomerVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCustomerVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomerVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
