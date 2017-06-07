import { TestBed, inject } from '@angular/core/testing';

import { PatientCreationLookupService } from './patient-creation-lookup.service';

describe('PatientCreationLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientCreationLookupService]
    });
  });

  it('should ...', inject([PatientCreationLookupService], (service: PatientCreationLookupService) => {
    expect(service).toBeTruthy();
  }));
});
