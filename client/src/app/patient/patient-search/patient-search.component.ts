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
import {PatientSearchConfig} from "../shared/patient-search-config.model";
import {ConfigService} from "app/core/config.service";

@Component({
  selector: 'c2s-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {
  private patientCreationLookupInfo: PatientCreationLookupInfo;
  private patientSearchConfig: PatientSearchConfig;
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
              private configService: ConfigService,
              private patientService: PatientService,
              private utilityService: UtilityService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.patientCreationLookupInfo = this.route.snapshot.data['patientCreationLookupInfo'];
    this.patientSearchConfig = this.configService.getConfigInSessionStorage().providerPermissions.patientSearch;
    this.searchPatientForm = this.initSearchPatientFormGroup();
    this.genders = this.patientCreationLookupInfo.genderCodes;

  }

  getRequiredAsterix(key: string): string {
    return this.patientSearchConfig[key] ? "*" : "";
  }

  private initSearchPatientFormGroup() {
    return this.formBuilder.group({
        firstName: [null, this.createFirstNameValidators()],
        lastName: [null, this.createLastNameValidators()],
        genderCode: [null],
        birthDate: [null, this.createDateOfBirthValidators()],
        mrn: [null, this.createMRNValidators()],
      },
      {validator: ValidationService.atLeastOneFieldValidator}
    );
  }

  createFirstNameValidators(): any {
    return this.patientSearchConfig.firstNameSearchEnabled ?
      [Validators.minLength(ValidationRules.NAME_MIN_LENGTH), Validators.maxLength(ValidationRules.NAME_MAX_LENGTH), Validators.required] :
      [Validators.minLength(ValidationRules.NAME_MIN_LENGTH), Validators.maxLength(ValidationRules.NAME_MAX_LENGTH)];
  }

  createLastNameValidators(): any {
    return this.patientSearchConfig.lastNameSearchEnabled ?
      [Validators.minLength(ValidationRules.NAME_MIN_LENGTH), Validators.maxLength(ValidationRules.NAME_MAX_LENGTH), Validators.required] :
      [Validators.minLength(ValidationRules.NAME_MIN_LENGTH), Validators.maxLength(ValidationRules.NAME_MAX_LENGTH)];
  }

  createDateOfBirthValidators(): any {
    return this.patientSearchConfig.dateOfBirthSearchEnabled ?
      [ValidationService.pastDateValidator, Validators.required] :
      [ValidationService.pastDateValidator];
  }

  createGenderValidators(): any {
    return this.patientSearchConfig.genderSearchEnabled ? [Validators.required] : [];
  }

  createMRNValidators(): any {
    return this.patientSearchConfig.patientIdSearchEnabled ?
      [Validators.minLength(ValidationRules.NAME_MIN_LENGTH), Validators.required] :
      [Validators.minLength(ValidationRules.NAME_MIN_LENGTH)];
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
