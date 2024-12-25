import { TestBed } from '@angular/core/testing';

import { ComWarehouseServiceService } from './com-warehouse-service.service';

describe('ComWarehouseServiceService', () => {
  let service: ComWarehouseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComWarehouseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
