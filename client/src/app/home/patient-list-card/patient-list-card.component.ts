import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {ApiUrlService} from "../../shared/api-url.service";
import {PatientService} from "../../patient/shared/patient.service";

@Component({
  selector: 'c2s-patient-list-card',
  templateUrl: './patient-list-card.component.html',
  styleUrls: ['./patient-list-card.component.scss']
})
export class PatientListCardComponent implements OnInit {
  public numberOfPatients: number = 0;
  public patientsMapping = {
    '=0': 'HOME.PATIENT_LIST_CARD.SINGULAR',
    '=1': 'HOME.PATIENT_LIST_CARD.SINGULAR',
    'other': 'HOME.PATIENT_LIST_CARD.PLURAL'
  };

  constructor(private apiUrlService: ApiUrlService,
              private patientService: PatientService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    const FIRST_PAGE: number = 0;
    this.patientService.getPatients(FIRST_PAGE)
      .subscribe(
        (patients) => {
          this.numberOfPatients = patients.totalElements
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public navigateTo(): void {
    this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl());
  }
}
