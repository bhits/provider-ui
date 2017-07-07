import { TestBed, inject } from '@angular/core/testing';

import { SampleDocumentResolveService } from './sample-document-resolve.service';

describe('SampleDocumentResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleDocumentResolveService]
    });
  });

  it('should ...', inject([SampleDocumentResolveService], (service: SampleDocumentResolveService) => {
    expect(service).toBeTruthy();
  }));
});
