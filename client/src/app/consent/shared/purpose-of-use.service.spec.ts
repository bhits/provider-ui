import { TestBed, inject } from '@angular/core/testing';

import { PurposeOfUseService } from './purpose-of-use.service';

describe('PurposeOfUseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurposeOfUseService]
    });
  });

  it('should ...', inject([PurposeOfUseService], (service: PurposeOfUseService) => {
    expect(service).toBeTruthy();
  }));
});
