import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFavoriteMaterialsComponent } from './sales-favorite-materials.component';

describe('SalesFavoriteMaterialsComponent', () => {
  let component: SalesFavoriteMaterialsComponent;
  let fixture: ComponentFixture<SalesFavoriteMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesFavoriteMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFavoriteMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
