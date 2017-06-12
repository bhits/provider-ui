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
import {IdentifierSystem} from "../shared/IdentifierSystem.model";

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
  public identifierSystems: IdentifierSystem[];
  public isEditMode: boolean = false;
  public phoneErrorMessage: string = ValidationRules.PHONE_MESSAGE;
  public ssnErrorMessage: string = ValidationRules.SSN_MESSAGE;
  public zipErrorMessage: string = ValidationRules.ZIP_MESSAGE;
  public title: string = "Create Patient";
  //Todo: Will remove when support multiple roles
  public disabledRoles: string[];
  public oneEmailRequiredMessage: string = ValidationRules.ONE_EMAIL_REQUIRED_MESSAGE;

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
    this.identifierSystems=patientCreationLookupInfo.identifierSystems
      .filter(identifierSystem => identifierSystem.systemGenerated !="1" && identifierSystem.display!="United States Social Security Number");
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
            this.title = "Patient Record";
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
      homeEmail: [null],
      registrationPurposeEmail: [null ],
      genderCode: [null, Validators.required],
      birthDate: [null, Validators.compose([
        Validators.required,
        ValidationService.pastDateValidator])
      ],
      socialSecurityNumber: [null, Validators.pattern(ValidationRules.SSN_PATTERN)],
      homePhone: [null, Validators.pattern(ValidationRules.PHONE_PATTERN)],
      homeAddress: this.initAddressFormGroup(),
      roles: [null, Validators.required],
      locale: [null, Validators.required],
      identifier: this.initIdentifierFormGroup()
    },
      {validator: ValidationService.oneEmailRequired('homeEmail', 'registrationPurposeEmail')})
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

  private initIdentifierFormGroup() {
    return this.formBuilder.group({
      system: [null, Validators.required],
      value: [null, Validators.required]
    });
  }

  private setValueOnEditPatientForm(patient: Patient) {
    let patientIdentifiers = patient.identifiers.filter(identifier => identifier.system !=="https://bhits.github.io/consent2share" && identifier.system!=="http://hl7.org/fhir/sid/us-ssn");
    if (patient.homeAddress != null) {
      this.createEditPatientForm.setValue({
        firstName: patient.firstName,
        middleName: patient.middleName,
        lastName: patient.lastName,
        homeEmail: patient.homeEmail,
        registrationPurposeEmail: patient.registrationPurposeEmail,
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
        locale: patient.locale,
        identifier:{
          system: patientIdentifiers[0].system,
          value: patientIdentifiers[0].value
      },
      })
    } else {
      this.createEditPatientForm.setValue({
        firstName: patient.firstName,
        middleName: patient.middleName,
        lastName: patient.lastName,
        homeEmail: patient.homeEmail,
        registrationPurposeEmail: patient.registrationPurposeEmail,
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
        locale: patient.locale,
        identifier: {
          system: patientIdentifiers[0].system,
          value: patientIdentifiers[0].value
        }
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
      const confirmTitle: string = "Confirm Navigation";
      const confirmMessage: string = "You will lose all unsaved work, Are you sure you want to leave this page?";
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
    let identifiers = [];
    identifiers.push(formModel.identifier);
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
      locale: formModel.locale,
      identifiers: identifiers,
      registrationPurposeEmail: formModel.registrationPurposeEmail
    };
  }
}
