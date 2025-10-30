import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantUpdateProductComponent } from './merchant-update-product.component';

describe('MerchantUpdateProductComponent', () => {
  let component: MerchantUpdateProductComponent;
  let fixture: ComponentFixture<MerchantUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantUpdateProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
