import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../shared/patient.model";

@Component({
  selector: 'c2s-segment-patient-health-record',
  templateUrl: './segment-patient-health-record.component.html',
  styleUrls: ['./segment-patient-health-record.component.scss']
})
export class SegmentPatientHealthRecordComponent implements OnInit {
  @Input() patient:Patient;

  constructor() { }

  ngOnInit() {
  }

}
