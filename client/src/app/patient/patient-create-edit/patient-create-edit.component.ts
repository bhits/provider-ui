import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "app/patient/shared/patient.service";
import {Patient} from "app/patient/shared/patient.model";
import {NotificationService} from "app/shared/notification.service";
import {UtilityService} from "app/shared/utility.service";
import {ApiUrlService} from "app/shared/api-url.service";
import {Role} from "app/patient/shared/role.model";
import {ActivatedRoute} from "@angular/router";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ConfirmDialogService} from "app/shared/confirm-dialog.service";
import {Observable} from "rxjs/Observable";
import {ValidationService} from "../../shared/validation.service";
import {PatientCreationLookupInfo} from "../shared/patient-creation-lookup-info.model";
import {BasePatientCreationLookup} from "../shared/base-patient-creation-lookup.model";

@Component({
  selector: 'c2s-patient-create-edit',
  templateUrl: './patient-create-edit.component.html',
  styleUrls: ['./patient-create-edit.component.scss']
})
export class PatientCreateEditComponent implements OnInit {

  private patientId: number;
  private toSubmit: boolean = false;
  public createEditPatientForm: FormGroup;
  public editingPatient: Patient;
  public isOpenOnFocus: boolean = true;
  public FORMAT: string = "MM/dd/y";
  public genders: BasePatientCreationLookup[];
  public locales: BasePatientCreationLookup[];
  public states: BasePatientCreationLookup[];
  public countries: BasePatientCreationLookup[];
  public roles: Role[];
  public isEditMode: boolean = false;
  public phoneErrorMessage: string = ValidationRules.PHONE_MESSAGE;
  public ssnErrorMessage: string = ValidationRules.SSN_MESSAGE;
  public zipErrorMessage: string = ValidationRules.ZIP_MESSAGE;
  public title: string = "PATIENT.CREATE_EDIT.CREATE_TITLE";
  //Todo: Will remove when support multiple roles
  public disabledRoles: string[];

  constructor(private apiUrlService: ApiUrlService,
              private confirmDialogService: ConfirmDialogService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private patientService: PatientService,
              private viewContainerRef: ViewContainerRef,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    let patientCreationLookupInfo: PatientCreationLookupInfo = this.route.snapshot.data['patientCreationLookupInfo'];
    this.roles = patientCreationLookupInfo.roles;
    this.genders = patientCreationLookupInfo.genderCodes;
    this.locales = patientCreationLookupInfo.locales;
    this.states = patientCreationLookupInfo.stateCodes;
    this.countries = patientCreationLookupInfo.countryCodes;
    this.disabledRoles = patientCreationLookupInfo.roles
      .filter(role => role.code != "patient")
      .map(role => role.code);
    this.createEditPatientForm = this.initCreateEditFormGroup();
    //Set patient as default role
    this.createEditPatientForm.controls['roles'].setValue([this.roles.filter(role => role.code === "patient").pop().code]);
    //Set English as default locale
    this.createEditPatientForm.controls['locale'].setValue(this.locales.filter(locale => locale.code === "en").pop().code);

    this.route.params
      .subscribe(
        params => {
          if (params['patientId']) {
            // Edit mode
            this.title = "PATIENT.CREATE_EDIT.EDIT_TITLE";
            let patient: Patient = this.route.snapshot.data['patient'];
            this.isEditMode = patient.id != null;
            this.patientId = patient.id;
            this.editingPatient = patient;
            this.setValueOnEditPatientForm(patient);
          }
        });
  }

  private initCreateEditFormGroup() {
    return this.formBuilder.group({
      firstName: [null,
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
          Validators.required
        ]
      ],
      middleName: [null,
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH)
        ]
      ],
      lastName: [null,
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
          Validators.required
        ]
      ],
      homeEmail: [null, Validators.compose([
        Validators.required,
        Validators.email])
      ],
      genderCode: [null, Validators.required],
      birthDate: [null, Validators.compose([
        Validators.required,
        ValidationService.pastDateValidator])
      ],
      socialSecurityNumber: [null, Validators.pattern(ValidationRules.SSN_PATTERN)],
      homePhone: [null, Validators.pattern(ValidationRules.PHONE_PATTERN)],
      homeAddress: this.initAddressFormGroup(),
      roles: [null, Validators.required],
      locale: [null, Validators.required]
    });
  }

  private initAddressFormGroup() {
    return this.formBuilder.group({
      line1: [null, Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      line2: [null, Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      city: [null, Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      stateCode: null,
      postalCode: [null, Validators.pattern(ValidationRules.ZIP_PATTERN)],
      countryCode: null
    });
  }

  private setValueOnEditPatientForm(patient: Patient) {
    if (patient.homeAddress != null) {
      this.createEditPatientForm.setValue({
        firstName: patient.firstName,
        middleName: patient.middleName,
        lastName: patient.lastName,
        homeEmail: patient.homeEmail,
        genderCode: patient.genderCode,
        birthDate: new Date(patient.birthDate),
        socialSecurityNumber: patient.socialSecurityNumber,
        homePhone: patient.homePhone,
        homeAddress: {
          line1: patient.homeAddress.line1,
          line2: patient.homeAddress.line2,
          city: patient.homeAddress.city,
          stateCode: patient.homeAddress.stateCode,
          postalCode: patient.homeAddress.postalCode,
          countryCode: patient.homeAddress.countryCode
        },
        roles: patient.roles,
        locale: patient.locale
      })
    } else {
      this.createEditPatientForm.setValue({
        firstName: patient.firstName,
        middleName: patient.middleName,
        lastName: patient.lastName,
        homeEmail: patient.homeEmail,
        genderCode: patient.genderCode,
        birthDate: new Date(patient.birthDate),
        socialSecurityNumber: patient.socialSecurityNumber,
        homePhone: patient.homePhone,
        homeAddress: {
          line1: null,
          line2: null,
          city: null,
          stateCode: null,
          postalCode: null,
          countryCode: null
        },
        roles: patient.roles,
        locale: patient.locale
      })
    }
  }

  cancel(): void {
    this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl());
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.toSubmit) {
      return true;
    } else if (this.createEditPatientForm.dirty) {
      const confirmTitle: string = "PATIENT.CREATE_EDIT.CONFIRM_DIALOG.TITLE";
      const confirmMessage: string = "PATIENT.CREATE_EDIT.CONFIRM_DIALOG.CONTENT";
      return this.confirmDialogService.confirm(confirmTitle, confirmMessage, this.viewContainerRef);
    } else {
      return true;
    }
  }

  createEditPatient(): void {
    this.toSubmit = true;
    if (this.isEditMode) {
      this.patientService.updatePatient(this.patientId, this.prepareCreateEditPatient())
        .subscribe(
          () => {
            this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl())
          },
          err => {
            this.notificationService.show("Error in updating patient.");
            console.log(err);
          }
        );
    } else {
      this.patientService.createPatient(this.prepareCreateEditPatient())
        .subscribe(
          () => {
            this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl())
          },
          err => {
            this.notificationService.show("Error in creating patient.");
            console.log(err);
          }
        );
    }
  }

  private prepareCreateEditPatient(): Patient {
    const formModel = this.createEditPatientForm.value;
    return {
      firstName: formModel.firstName,
      middleName: formModel.middleName,
      lastName: formModel.lastName,
      homeEmail: formModel.homeEmail,
      birthDate: formModel.birthDate,
      genderCode: formModel.genderCode,
      socialSecurityNumber: formModel.socialSecurityNumber,
      homePhone: formModel.homePhone,
      homeAddress: formModel.homeAddress,
      roles: formModel.roles,
      locale: formModel.locale
    };
  }
}
