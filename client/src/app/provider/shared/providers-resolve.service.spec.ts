import { TestBed, inject } from '@angular/core/testing';

import { ProvidersResolveService } from './providers-resolve.service';

describe('ProvidersResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvidersResolveService]
    });
  });

  it('should ...', inject([ProvidersResolveService], (service: ProvidersResolveService) => {
    expect(service).toBeTruthy();
  }));
});
