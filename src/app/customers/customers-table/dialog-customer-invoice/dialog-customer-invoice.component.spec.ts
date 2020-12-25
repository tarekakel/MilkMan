import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomerInvoiceComponent } from './dialog-customer-invoice.component';

describe('DialogCustomerInvoiceComponent', () => {
  let component: DialogCustomerInvoiceComponent;
  let fixture: ComponentFixture<DialogCustomerInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCustomerInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomerInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
