import { TestBed, inject } from '@angular/core/testing';

import { PatientCreationLookupResolveService } from './patient-creation-lookup-resolve.service';

describe('PatientCreationLookupResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientCreationLookupResolveService]
    });
  });

  it('should ...', inject([PatientCreationLookupResolveService], (service: PatientCreationLookupResolveService) => {
    expect(service).toBeTruthy();
  }));
});
