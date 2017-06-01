import {inject, TestBed} from "@angular/core/testing";

import {ConfirmDialogService} from "./confirm-dialog.service";

describe('ConfirmDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmDialogService]
    });
  });

  it('should ...', inject([ConfirmDialogService], (service: ConfirmDialogService) => {
    expect(service).toBeTruthy();
  }));
});
