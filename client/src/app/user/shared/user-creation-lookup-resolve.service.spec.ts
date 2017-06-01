import { TestBed, inject } from '@angular/core/testing';

import { UserCreationLookupResolveService } from './user-creation-lookup-resolve.service';

describe('UserCreationLookupResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCreationLookupResolveService]
    });
  });

  it('should ...', inject([UserCreationLookupResolveService], (service: UserCreationLookupResolveService) => {
    expect(service).toBeTruthy();
  }));
});
