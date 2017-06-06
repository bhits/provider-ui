import {Component, OnInit} from "@angular/core";
import {ApiUrlService} from "../../shared/api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {PatientService} from "../../patient/shared/patient.service";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public numberOfPatients: number = 0;

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

  navigateTo() {
    this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl());
  }
}
