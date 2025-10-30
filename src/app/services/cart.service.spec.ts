import { TestBed } from '@angular/core/testing';

import { CartsService } from './cart.service';

describe('CartService', () => {
  let service: CartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
