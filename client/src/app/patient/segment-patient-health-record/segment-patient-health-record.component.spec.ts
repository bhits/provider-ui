import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentPatientHealthRecordComponent } from './segment-patient-health-record.component';

describe('SegmentPatientHealthRecordComponent', () => {
  let component: SegmentPatientHealthRecordComponent;
  let fixture: ComponentFixture<SegmentPatientHealthRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentPatientHealthRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentPatientHealthRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
