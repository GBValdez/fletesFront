import { TestBed } from '@angular/core/testing';

import { ProductVehicleService } from './product-vehicle.service';

describe('ProductVehicleService', () => {
  let service: ProductVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
