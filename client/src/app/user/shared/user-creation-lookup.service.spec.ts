import { TestBed, inject } from '@angular/core/testing';

import { UserCreationLookupService } from './user-creation-lookup.service';

describe('UserCreationLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCreationLookupService]
    });
  });

  it('should ...', inject([UserCreationLookupService], (service: UserCreationLookupService) => {
    expect(service).toBeTruthy();
  }));
});
