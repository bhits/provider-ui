import { TestBed, inject } from '@angular/core/testing';

import { ConsentTermsResolveService } from './consent-terms-resolve.service';

describe('ConsentTermsResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsentTermsResolveService]
    });
  });

  it('should ...', inject([ConsentTermsResolveService], (service: ConsentTermsResolveService) => {
    expect(service).toBeTruthy();
  }));
});
