import { TestBed, inject } from '@angular/core/testing';

import { ConsentResolveService } from './consent-resolve.service';

describe('ConsentResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsentResolveService]
    });
  });

  it('should ...', inject([ConsentResolveService], (service: ConsentResolveService) => {
    expect(service).toBeTruthy();
  }));
});
