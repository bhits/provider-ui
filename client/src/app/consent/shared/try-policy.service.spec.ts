import { TestBed, inject } from '@angular/core/testing';

import { TryPolicyService } from './try-policy.service';

describe('TryPolicyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TryPolicyService]
    });
  });

  it('should ...', inject([TryPolicyService], (service: TryPolicyService) => {
    expect(service).toBeTruthy();
  }));
});
