import { TestBed, inject } from '@angular/core/testing';

import { ProviderPatientResolveService } from './provider-patient-resolve.service';

describe('ProviderPatientResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderPatientResolveService]
    });
  });

  it('should ...', inject([ProviderPatientResolveService], (service: ProviderPatientResolveService) => {
    expect(service).toBeTruthy();
  }));
});
