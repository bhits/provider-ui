import { TestBed, inject } from '@angular/core/testing';

import { DetailedConsentResolveService } from './detailed-consent-resolve.service';

describe('DetailedConsentResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailedConsentResolveService]
    });
  });

  it('should ...', inject([DetailedConsentResolveService], (service: DetailedConsentResolveService) => {
    expect(service).toBeTruthy();
  }));
});
