import { TestBed } from '@angular/core/testing';

import { EnterpriseTreeService } from './enterprise-tree.service';

describe('EnterpriseTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterpriseTreeService = TestBed.get(EnterpriseTreeService);
    expect(service).toBeTruthy();
  });
});
