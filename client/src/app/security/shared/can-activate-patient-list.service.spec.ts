import { TestBed, inject } from '@angular/core/testing';

import { CanActivatePatientListService } from './can-activate-patient-list.service';

describe('CanActivatePatientListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivatePatientListService]
    });
  });

  it('should ...', inject([CanActivatePatientListService], (service: CanActivatePatientListService) => {
    expect(service).toBeTruthy();
  }));
});
