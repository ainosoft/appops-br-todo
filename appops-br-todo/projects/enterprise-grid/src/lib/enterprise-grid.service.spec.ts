import { TestBed } from '@angular/core/testing';

import { EnterpriseGridService } from './enterprise-grid.service';

describe('EnterpriseGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterpriseGridService = TestBed.get(EnterpriseGridService);
    expect(service).toBeTruthy();
  });
});
