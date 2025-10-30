import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAddProductsComponent } from './merchant-add-products.component';

describe('MerchantAddProductsComponent', () => {
  let component: MerchantAddProductsComponent;
  let fixture: ComponentFixture<MerchantAddProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantAddProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantAddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
