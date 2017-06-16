import { TestBed, inject } from '@angular/core/testing';

import { SensitivityCategoriesResolveService } from './sensitivity-categories-resolve.service';

describe('SensitivityCategoriesResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensitivityCategoriesResolveService]
    });
  });

  it('should ...', inject([SensitivityCategoriesResolveService], (service: SensitivityCategoriesResolveService) => {
    expect(service).toBeTruthy();
  }));
});
