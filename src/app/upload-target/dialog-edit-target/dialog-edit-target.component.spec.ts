import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTargetComponent } from './dialog-edit-target.component';

describe('DialogEditTargetComponent', () => {
  let component: DialogEditTargetComponent;
  let fixture: ComponentFixture<DialogEditTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
