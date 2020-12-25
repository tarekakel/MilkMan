import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomersSearchInvoiceComponent } from './dialog-customers-search-invoice.component';

describe('DialogCustomersSearchInvoiceComponent', () => {
  let component: DialogCustomersSearchInvoiceComponent;
  let fixture: ComponentFixture<DialogCustomersSearchInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCustomersSearchInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomersSearchInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
