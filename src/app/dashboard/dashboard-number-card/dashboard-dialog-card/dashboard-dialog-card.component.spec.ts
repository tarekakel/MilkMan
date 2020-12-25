import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDialogCardComponent } from './dashboard-dialog-card.component';

describe('DashboardDialogCardComponent', () => {
  let component: DashboardDialogCardComponent;
  let fixture: ComponentFixture<DashboardDialogCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDialogCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDialogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
