import { TestBed, inject } from '@angular/core/testing';

import { CustomTranslateService } from './custom-translate.service';

describe('CustomTranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomTranslateService]
    });
  });

  it('should ...', inject([CustomTranslateService], (service: CustomTranslateService) => {
    expect(service).toBeTruthy();
  }));
});
