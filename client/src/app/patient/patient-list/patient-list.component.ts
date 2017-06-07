import {Component, OnInit} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Patient} from "../shared/patient.model";
import {NotificationService} from "../../shared/notification.service";
import {UtilityService} from "../../shared/utility.service";
import {PatientService} from "../shared/patient.service";
import {PageableData} from "../../shared/pageable-data.model";

@Component({
  selector: 'c2s-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  private searchTerms = new Subject<string>();
  private totalPages: number = 0;
  public totalItems: number = 0;
  public itemsPerPage: number = 0;
  public currentPage: number = 1;
  public noResult: boolean = false;
  public loading: boolean = false;
  public asyncPatients: Observable<Patient[]>;
  public searchPatients: Patient[];

  constructor(private notificationService: NotificationService,
              private patientService: PatientService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
    // Avoid to send too many API calls
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.patientService.searchPatients(term))
      .subscribe(
        (patients) => {
          this.searchPatients = patients;
        },
        err => {
          this.notificationService.show("Failed to search patient, please try again later...");
        });
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public getPage(page: number) {
    this.loading = true;
    this.asyncPatients = this.patientService.getPatients(page - 1)
      .do((patients: PageableData<Patient>) => {
        this.noResult = patients.totalElements === 0;
        this.totalItems = patients.totalElements;
        this.totalPages = patients.totalPages;
        this.itemsPerPage = patients.size;
        this.currentPage = patients.number + 1;
        this.loading = false;
      })
      .map(pageablePatient => pageablePatient.content);
  }

  public redirectToPatientEdit(patient: Patient) {
    const editPatientUrl: string = `${"/patients/edit"}/${patient.id}`;
    this.utilityService.navigateTo(editPatientUrl)
  }
}
