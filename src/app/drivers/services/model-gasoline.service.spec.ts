import { TestBed } from '@angular/core/testing';

import { ModelGasolineService } from './model-gasoline.service';

describe('ModelGasolineService', () => {
  let service: ModelGasolineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelGasolineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
