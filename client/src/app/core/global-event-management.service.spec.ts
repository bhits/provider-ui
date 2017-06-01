import {inject, TestBed} from "@angular/core/testing";

import {GlobalEventManagementService} from "./global-event-management.service";

describe('GlobalEventManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalEventManagementService]
    });
  });

  it('should ...', inject([GlobalEventManagementService], (service: GlobalEventManagementService) => {
    expect(service).toBeTruthy();
  }));
});
