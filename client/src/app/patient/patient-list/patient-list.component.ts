import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Patient} from "../shared/patient.model";
import {UtilityService} from "../../shared/utility.service";
import {PatientService} from "../shared/patient.service";
import {PageableData} from "../../shared/pageable-data.model";

@Component({
  selector: 'c2s-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  public totalItems: number = 0;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public noResult: boolean = false;
  public loading: boolean = false;
  public asyncPatients: Observable<Patient[]>;

  constructor(private patientService: PatientService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  public getPage(page: number) {
    this.loading = true;
    this.asyncPatients = this.patientService.getPatients(page - 1)
      .do((patients: PageableData<Patient>) => {
        this.noResult = patients.totalElements === 0;
        this.totalItems = patients.totalElements;
        this.currentPage = patients.number + 1;
        this.loading = false;
      })
      .map(pageablePatient => pageablePatient.content);
  }

  public redirectToPatientEdit(patient: Patient) {
    const editPatientUrl: string = "/patients".concat("/" + patient.id);
    this.utilityService.navigateTo(editPatientUrl)
  }
}
