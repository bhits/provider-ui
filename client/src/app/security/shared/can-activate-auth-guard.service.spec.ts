import {inject, TestBed} from "@angular/core/testing";

import {CanActivateAuthGuardService} from "./can-activate-auth-guard.service";

describe('CanActivateAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateAuthGuardService]
    });
  });

  it('should ...', inject([CanActivateAuthGuardService], (service: CanActivateAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
