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

  private readonly DEFAULT_ROLE: string = "patient";
  private patientId: number;
  private toSubmit: boolean = false;
  private patientCreationLookupInfo: PatientCreationLookupInfo;
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
  public emailErrorMessage: string = ValidationRules.EMAIL_MESSAGE;
  public ssnErrorMessage: string = ValidationRules.SSN_MESSAGE;
  public zipErrorMessage: string = ValidationRules.ZIP_MESSAGE;
  public title: string = "PATIENT.CREATE_EDIT.CREATE_TITLE";
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
    this.patientCreationLookupInfo = this.route.snapshot.data['patientCreationLookupInfo'];
    this.roles = this.patientCreationLookupInfo.roles;
    this.genders = this.patientCreationLookupInfo.genderCodes;
    this.locales = this.patientCreationLookupInfo.locales;
    this.states = this.patientCreationLookupInfo.stateCodes;
    this.countries = this.patientCreationLookupInfo.countryCodes;
    this.disabledRoles = this.patientCreationLookupInfo.roles
      .filter(role => role.code != this.DEFAULT_ROLE)
      .map(role => role.code);
    this.identifierSystems = this.patientCreationLookupInfo.identifierSystems
      .map(identifierSystem => {
        identifierSystem.requiredIdentifierSystemsByRole = this.utilityService.convertJsonObjToStrMap(identifierSystem.requiredIdentifierSystemsByRole);
        return identifierSystem;
      })
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole)
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole.size > 0)
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole.has(this.DEFAULT_ROLE))
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole.get(this.DEFAULT_ROLE).filter(requiredIdentifierSystem => requiredIdentifierSystem.algorithm === "NONE").length > 0);
    this.createEditPatientForm = this.initCreateEditFormGroup();
    //Set patient as default role
    this.createEditPatientForm.controls['roles'].setValue([this.roles.filter(role => role.code === this.DEFAULT_ROLE).pop().code]);
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
          Validators.pattern(ValidationRules.EMAIL_PATTERN),
          Validators.maxLength(ValidationRules.TELECOM_MAX_LENGTH)])
        ],
        registrationPurposeEmail: [null, Validators.pattern(ValidationRules.EMAIL_PATTERN)],
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
      line1: [null, Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH)],
      line2: [null, Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH)],
      city: [null, Validators.maxLength(ValidationRules.CITY_MAX_LENGTH)],
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
    let patientIdentifiers = patient.identifiers.filter(identifier => identifier.system !== "https://bhits.github.io/consent2share" && identifier.system !== "http://hl7.org/fhir/sid/us-ssn");
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
        identifier: {
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

  onRoleChange(event: any) {
    this.createEditPatientForm.get("identifier.value").setValue(null);
    this.createEditPatientForm.get("identifier.system").setValue(null);
    const selectedRoles: string[] = event.value;

    this.identifierSystems = this.patientCreationLookupInfo.identifierSystems
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole)
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole.size > 0)
      .filter(identifierSystem => {
          let ok: boolean = false;
          selectedRoles.forEach(role => {
            if (identifierSystem.requiredIdentifierSystemsByRole.has(role) &&
              identifierSystem.requiredIdentifierSystemsByRole
                .get(role)
                .filter(requiredIdentifierSystem => requiredIdentifierSystem.algorithm === "NONE").length > 0
            ) {
              ok = true;
            }
          });
          return ok;
        }
      );
  }

  onIdentifierSystemChange(event: any) {
    this.createEditPatientForm.get("identifier.value").setValue(null);
  }

  private prepareCreateEditPatient(): Patient {
    const formModel = this.createEditPatientForm.value;
    let identifiers = [];
    identifiers.push(formModel.identifier);
    return {
      firstName: formModel.firstName,
      middleName: this.setNullValue(formModel.middleName),
      lastName: formModel.lastName,
      homeEmail: this.setNullValue(formModel.homeEmail),
      birthDate: formModel.birthDate,
      genderCode: formModel.genderCode,
      socialSecurityNumber: this.setNullValue(formModel.socialSecurityNumber),
      homePhone: this.setNullValue(formModel.homePhone),
      homeAddress: this.setNullValueForAddress(formModel.homeAddress),
      roles: formModel.roles,
      locale: formModel.locale,
      identifiers: identifiers,
      registrationPurposeEmail: this.setNullValue(formModel.registrationPurposeEmail)
    };
  }

  private setNullValue(field: string) {
    return field === '' ? null : field;
  }

  private setNullValueForAddress(homeAddress:{line1:string,line2:string,city:string,stateCode:string,postalCode:string,countryCode, string}) {
    homeAddress.line1=this.setNullValue(homeAddress.line1);
    homeAddress.line2=this.setNullValue(homeAddress.line2);
    homeAddress.city=this.setNullValue(homeAddress.city);
    homeAddress.stateCode=this.setNullValue(homeAddress.stateCode);
    homeAddress.postalCode=this.setNullValue(homeAddress.postalCode);
    homeAddress.countryCode=this.setNullValue(homeAddress.countryCode);
    return homeAddress;
  }

}
