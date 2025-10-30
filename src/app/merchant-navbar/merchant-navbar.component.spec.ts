import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantNavbarComponent } from './merchant-navbar.component';

describe('MerchantNavbarComponent', () => {
  let component: MerchantNavbarComponent;
  let fixture: ComponentFixture<MerchantNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
