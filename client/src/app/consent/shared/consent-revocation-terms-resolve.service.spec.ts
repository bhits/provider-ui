import { TestBed, inject } from '@angular/core/testing';

import { ConsentRevocationTermsResolveService } from './consent-revocation-terms-resolve.service';

describe('ConsentRevocationTermsResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsentRevocationTermsResolveService]
    });
  });

  it('should ...', inject([ConsentRevocationTermsResolveService], (service: ConsentRevocationTermsResolveService) => {
    expect(service).toBeTruthy();
  }));
});
