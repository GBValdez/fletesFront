import { TestBed } from '@angular/core/testing';

import { ProviderProductService } from './provider-product.service';

describe('ProviderProductService', () => {
  let service: ProviderProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
