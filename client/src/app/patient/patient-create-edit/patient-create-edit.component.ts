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
import {ConfigService} from "../../core/config.service";
import {ProviderPermissions} from "../../core/provider-permissions.model";

@Component({
  selector: 'c2s-patient-create-edit',
  templateUrl: './patient-create-edit.component.html',
  styleUrls: ['./patient-create-edit.component.scss']
})
export class PatientCreateEditComponent implements OnInit {

  private readonly DEFAULT_ROLE: string = "patient";
  private patientId: number;
  private patient: Patient;
  private toSubmit: boolean = false;
  private patientCreationLookupInfo: PatientCreationLookupInfo;
  public createEditPatientForm: FormGroup;
  public formChanged: boolean = false;
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
  //turn off display activation and segmentation
  public displayActivation: boolean = false;
  public displaySegmentation: boolean = false;
  public duplicateCheckEnabled: boolean = false;

  constructor(private apiUrlService: ApiUrlService,
              private confirmDialogService: ConfirmDialogService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private patientService: PatientService,
              private viewContainerRef: ViewContainerRef,
              private utilityService: UtilityService,
              private configService: ConfigService) {
  }

  ngOnInit() {
    this.patientCreationLookupInfo = this.route.snapshot.data['patientCreationLookupInfo'];
    const providerPermissions: ProviderPermissions = this.route.snapshot.data['providerPermissions'];
    this.displayActivation = providerPermissions.userActivationEnabled;
    this.displaySegmentation = providerPermissions.segmentationEnabled;
    this.duplicateCheckEnabled = providerPermissions.registration.duplicateCheckEnabled;
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
            this.patient = this.route.snapshot.data['patient'];
            this.isEditMode = this.patient.id != null;
            this.patientId = this.patient.id;
            this.editingPatient = this.patient;
            this.setValueOnEditPatientForm(this.patient);
          }
        });
    // To detect if form has changed
    this.createEditPatientForm.valueChanges.subscribe(data => {
      if (data != null) {
        this.formChanged = true;
      }
    });
  }

  private initCreateEditFormGroup() {
    const controlsConfig: any = {
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
      homeEmail: [null, Validators.pattern(ValidationRules.EMAIL_PATTERN)],
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
      locale: [null, Validators.required]
    };
    if (this.isIdentifiersEnabled()) {
      controlsConfig.identifier = this.initIdentifierFormGroup();
    }
    return this.formBuilder.group(controlsConfig,
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
      const value: any = {
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
        locale: patient.locale
      };
      if (this.isIdentifiersEnabled()) {
        value.identifier = {
          system: patientIdentifiers[0].system,
          value: patientIdentifiers[0].value
        };
      }
      this.createEditPatientForm.setValue(value);
    } else {
      let value: any = {
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
        locale: patient.locale
      };
      if (this.isIdentifiersEnabled()) {
        value.identifier = {
          system: patientIdentifiers[0].system,
          value: patientIdentifiers[0].value
        }
      }
      this.createEditPatientForm.setValue(value);
    }
    if (this.isIdentifiersEnabled()) {
      //Disable identifier system when in Patient Edit Mode
      this.createEditPatientForm.get("identifier.system").disable();
    }
  }

  cancel(): void {
    this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl());
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.toSubmit) {
      return true;
    } else if (this.formChanged) {
      const confirmTitle: string = "PATIENT.CREATE_EDIT.CONFIRM_DIALOG.TITLE";
      const confirmMessage: string = "PATIENT.CREATE_EDIT.CONFIRM_DIALOG.CONTENT";
      return this.confirmDialogService.confirm(confirmTitle, confirmMessage, this.viewContainerRef);
    } else {
      return true;
    }
  }

  createEditPatient(): void {
    this.toSubmit = true;
    // editMode = true
    if (this.isEditMode) {
      this.patientService.updatePatient(this.patientId, this.prepareCreateEditPatient())
        .subscribe(
          () => {
            this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl())
          },
          err => {
            this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.FAILED_UPDATE_PATIENT");
            console.log(err);
          }
        );
    }
    // editMode = false && duplicateCheckEnabled = true
    else if (this.duplicateCheckEnabled) {
      // check backend if the patient already exists
      const patient: Patient = this.createEditPatientForm.value;
      this.patientService.searchPatientsByDemographics({
        firstName: patient.firstName,
        lastName: patient.lastName,
        genderCode: patient.genderCode,
        birthDate: this.utilityService.formatDate(patient.birthDate, 'yyyy-MM-dd'),
        strictMatch: true
      })
        .subscribe(resp => {
          // if there is at least one patient matching the criteria
          if (resp.totalElements > 0) {
            // prompt a message in modal
            this.confirmDialogService.confirm("PATIENT.CREATE_EDIT.DUPLICATE_CHECK_CONFIRM_DIALOG.TITLE",
              "PATIENT.CREATE_EDIT.DUPLICATE_CHECK_CONFIRM_DIALOG.CONTENT",
              this.viewContainerRef,
              {
                okLabel: "PATIENT.CREATE_EDIT.DUPLICATE_CHECK_CONFIRM_DIALOG.OK_BTN",
                cancelLabel: "PATIENT.CREATE_EDIT.DUPLICATE_CHECK_CONFIRM_DIALOG.CANCEL_BTN"
              }
            )
              .subscribe(confirmationResponse => {
                  if (confirmationResponse) {
                    // if the user confirms, create the patient
                    this.createPatient();
                  } else {
                    // else, go back to patient search page
                    this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl());
                  }
                }
              );
          } else {
            // if there is no patient found matching the criteria, create the patient without prompting the user
            this.createPatient();
          }
        });
    }
    // editMode = false && duplicateCheckEnabled = false
    else {
      this.createPatient();
    }
  }

  createPatient() {
    this.patientService.createPatient(this.prepareCreateEditPatient())
      .subscribe(
        () => {
          this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl())
        },
        err => {
          this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.FAILED_CREATE_PATIENT");
          console.log(err);
        }
      );
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
    const patient: Patient = {
      firstName: formModel.firstName,
      middleName: this.filterEmptyStringValue(formModel.middleName),
      lastName: formModel.lastName,
      homeEmail: this.filterEmptyStringValue(formModel.homeEmail),
      birthDate: formModel.birthDate,
      genderCode: formModel.genderCode,
      socialSecurityNumber: this.filterEmptyStringValue(formModel.socialSecurityNumber),
      homePhone: this.filterEmptyStringValue(formModel.homePhone),
      homeAddress: this.filterEmptyStringValueForAddress(formModel.homeAddress),
      roles: formModel.roles,
      locale: formModel.locale,
      registrationPurposeEmail: this.filterEmptyStringValue(formModel.registrationPurposeEmail)
    }
    if (this.isIdentifiersEnabled()) {
      let identifiers = [];
      identifiers.push(this.createEditPatientForm.getRawValue().identifier);
      patient.identifiers = identifiers;
    }
    return patient;
  }

  private filterEmptyStringValue(field: string) {
    return field === '' ? null : field;
  }

  private filterEmptyStringValueForAddress(homeAddress) {
    homeAddress.line1 = this.filterEmptyStringValue(homeAddress.line1);
    homeAddress.line2 = this.filterEmptyStringValue(homeAddress.line2);
    homeAddress.city = this.filterEmptyStringValue(homeAddress.city);
    homeAddress.stateCode = this.filterEmptyStringValue(homeAddress.stateCode);
    homeAddress.postalCode = this.filterEmptyStringValue(homeAddress.postalCode);
    homeAddress.countryCode = this.filterEmptyStringValue(homeAddress.countryCode);
    return homeAddress;
  }

  public isIdentifiersEnabled(): boolean {
    return this.identifierSystems.length > 0;
  }
}
