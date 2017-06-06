import { TestBed, inject } from '@angular/core/testing';

import { PatientResolveService } from './patient-resolve.service';

describe('PatientResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientResolveService]
    });
  });

  it('should ...', inject([PatientResolveService], (service: PatientResolveService) => {
    expect(service).toBeTruthy();
  }));
});
