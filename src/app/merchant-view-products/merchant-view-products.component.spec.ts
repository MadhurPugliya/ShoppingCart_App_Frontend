import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantViewProductsComponent } from './merchant-view-products.component';

describe('MerchantViewProductsComponent', () => {
  let component: MerchantViewProductsComponent;
  let fixture: ComponentFixture<MerchantViewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantViewProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
