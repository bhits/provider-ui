import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Patient} from "../shared/patient.model";
import {UtilityService} from "../../shared/utility.service";
import {PatientService} from "../shared/patient.service";
import {PageableData} from "../../shared/pageable-data.model";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ValidationService} from "../../shared/validation.service";
import {BasePatientCreationLookup} from "../shared/base-patient-creation-lookup.model";
import {PatientCreationLookupInfo} from "../shared/patient-creation-lookup-info.model";
import {PatientSearchQuery} from "../shared/patient-search-query.model";
import {ApiUrlService} from "app/shared/api-url.service";

@Component({
  selector: 'c2s-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {
  private patientCreationLookupInfo: PatientCreationLookupInfo;
  public noResult: boolean = false;
  public loading: boolean = false;
  public searchPatientForm: FormGroup;
  public genders: BasePatientCreationLookup[];
  public hasSearchResult: boolean = false;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public asyncPatients: Observable<Patient[]>;
  public requestParams: PatientSearchQuery;
  public FORMAT: string = "MM/dd/y";
  public isOpenOnFocus: boolean = true;
  public DATE_FORMAT: string = "y-MM-dd";

  constructor(private apiUrlService: ApiUrlService,
              private patientService: PatientService,
              private utilityService: UtilityService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.patientCreationLookupInfo = this.route.snapshot.data['patientCreationLookupInfo'];
    this.searchPatientForm = this.initSearchPatientFormGroup();
    this.genders = this.patientCreationLookupInfo.genderCodes;

  }

  private initSearchPatientFormGroup() {
    return this.formBuilder.group({
        firstName: [null,
          [
            Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
            Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
            Validators.required
          ]
        ],
        lastName: [null,
          [
            Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
            Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
            Validators.required
          ]
        ],
        genderCode: [null],
        birthDate: [null,
          [
            ValidationService.pastDateValidator,
            Validators.required
          ]
        ],
        mrn: [null,
          [
            Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          ]
        ],
      },
      {validator: ValidationService.atLeastOneFieldValidator})
  }

  public searchPatient(): void {
    this.requestParams = this.prepareSearchPatient();
    this.getPage(1);
  }

  private prepareSearchPatient(): PatientSearchQuery {
    const formModel = this.searchPatientForm.value;
    return {
      firstName: this.filterEmptyStringValue(formModel.firstName),
      lastName: this.filterEmptyStringValue(formModel.lastName),
      birthDate: this.utilityService.formatDate(formModel.birthDate, this.DATE_FORMAT),
      genderCode: this.filterEmptyStringValue(formModel.genderCode),
      mrn: this.filterEmptyStringValue(formModel.mrn)
    };
  }

  private filterEmptyStringValue(field: string) {
    return field === '' ? null : field;
  }

  public getPage(page: number) {
    this.loading = true;
    this.requestParams.page = (page - 1).toString();
    this.asyncPatients = this.patientService.searchPatientsByDemographics(this.requestParams)
      .do((patients: PageableData<Patient>) => {
        this.hasSearchResult = true;
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

  public clear(): void {
    this.searchPatientForm.reset();
    this.hasSearchResult = false;
    this.asyncPatients = null;
    this.noResult = false;
  }

  public cancel(): void {
    this.utilityService.navigateTo(this.apiUrlService.getHomeUrl())
  }
}
