import { TestBed, inject } from '@angular/core/testing';

import { ConfigResolveService } from './config-resolve.service';

describe('ConfigResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigResolveService]
    });
  });

  it('should ...', inject([ConfigResolveService], (service: ConfigResolveService) => {
    expect(service).toBeTruthy();
  }));
});
