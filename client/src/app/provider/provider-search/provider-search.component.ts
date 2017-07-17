import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationRules} from "app/shared/validation-rules.model";
import {ProviderService} from "app/provider/shared/provider.service";
import {ProviderRequestQuery} from "app/provider/shared/provider-request-query.model";
import {ProviderSearchResponse} from "app/provider/shared/provider-search-response.model";
import {ActivatedRoute} from "@angular/router";
import {BasePatientCreationLookup} from "../../patient/shared/base-patient-creation-lookup.model";
import {PatientCreationLookupInfo} from "../../patient/shared/patient-creation-lookup-info.model";
import {ProviderSearchStateCodes} from "../shared/provider-search-state-codes.model";

@Component({
  selector: 'c2s-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.scss']
})
export class ProviderSearchComponent implements OnInit {
  public searchProviderFrom: FormGroup;
  public accordionTab: boolean = true;
  public searchResponse: ProviderSearchResponse;
  public searchStateCodes: ProviderSearchStateCodes;
  public hasSearchResult: boolean = false;
  public genders: BasePatientCreationLookup[];
  public states: BasePatientCreationLookup[];
  public zipErrorMessage: string = ValidationRules.ZIP_MESSAGE;
  public phoneErrorMessage: string = ValidationRules.PHONE_MESSAGE;

  public PROVIDER_TYPE = {
    INDIVIDUAL: 'individual',
    ORGANIZATION: 'organization'
  };

  public LOCATING_TYPE = {
    STATE_CITY: 'stateCity',
    ZIP: 'zip'
  };

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    let patientCreationLookupInfo: PatientCreationLookupInfo = this.route.snapshot.data['patientCreationLookupInfo'];
    this.genders = patientCreationLookupInfo.genderCodes;
    this.providerService.getProviderStateCodes().subscribe(
      res => {
        this.states=res._embedded['stateCodes'];
      });

    // build search form parent group
    this.searchProviderFrom = this.formBuilder.group({
      locatingType: this.initLocatingTypeFormGroup(),
      providerType: this.initProviderTypeFormGroup()
    });

    this.subscribeLocatingTypeChanges();
    this.subscribeProviderTypeChanges();
    this.setLocatingType(this.LOCATING_TYPE.STATE_CITY);
    this.setProviderType(this.PROVIDER_TYPE.INDIVIDUAL);
  }

  private initLocatingTypeFormGroup() {
    // initialize locating type form group
    return this.formBuilder.group({
      type: [''],
      stateCity: this.formBuilder.group(this.initStateCityModel()),
      zip: this.formBuilder.group(this.initZipModel())
    });
  }

  private initStateCityModel() {
    // initialize state city model
    return {
      state: ['', Validators.required],
      city: [null,
        [
          Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH),
          Validators.maxLength(ValidationRules.CITY_MAX_LENGTH),
          Validators.required
        ]
      ]
    };
  }

  private initZipModel() {
    // initialize zip model
    return {
      zipCode: ['',
        [
          Validators.pattern(ValidationRules.ZIP_PATTERN),
          Validators.required
        ]
      ]
    };
  }

  private initProviderTypeFormGroup() {
    // initialize provider type form group
    return this.formBuilder.group({
      type: [''],
      individual: this.formBuilder.group(this.initProviderIndividualModel()),
      organization: this.formBuilder.group(this.initProviderOrganizationModel()),
    });
  }

  private initProviderIndividualModel() {
    // initialize individual model
    return {
      lastName: [null,
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
          Validators.required
        ]
      ],
      firstName: ['',
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH)
        ]
      ],
      genderCode: '',
      phone: [null, Validators.pattern(ValidationRules.PHONE_PATTERN)]
    };
  }

  private initProviderOrganizationModel() {
    // initialize organization model
    return {
      orgName: ['',
        [
          Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH),
          Validators.required
        ]
      ],
      phone: [null, Validators.pattern(ValidationRules.PHONE_PATTERN)]
    };
  }

  private subscribeLocatingTypeChanges() {
    // controls
    const ltCtrl = (<any>this.searchProviderFrom).controls.locatingType;
    const stateCityCtrl = ltCtrl.controls.stateCity;
    const zipCtrl = ltCtrl.controls.zip;

    // initialize value changes stream
    const typeChanges = ltCtrl.controls.type.valueChanges;

    // subscribe to the stream
    typeChanges.subscribe(locatingType => {
      if (locatingType === this.LOCATING_TYPE.STATE_CITY) {
        Object.keys(stateCityCtrl.controls).forEach(key => {
          stateCityCtrl.controls[key].setValidators(this.initStateCityModel()[key][1]);
          stateCityCtrl.controls[key].updateValueAndValidity();
        });

        Object.keys(zipCtrl.controls).forEach(key => {
          zipCtrl.controls[key].setValue(null);
          zipCtrl.controls[key].setValidators(null);
          zipCtrl.controls[key].updateValueAndValidity();
        });
      }

      if (locatingType === this.LOCATING_TYPE.ZIP) {
        Object.keys(stateCityCtrl.controls).forEach(key => {
          stateCityCtrl.controls[key].setValue(null);
          stateCityCtrl.controls[key].setValidators(null);
          stateCityCtrl.controls[key].updateValueAndValidity();
        });

        Object.keys(zipCtrl.controls).forEach(key => {
          zipCtrl.controls[key].setValidators(this.initZipModel()[key][1]);
          zipCtrl.controls[key].updateValueAndValidity();
        });
      }
    });
  }

  private subscribeProviderTypeChanges() {
    // controls
    const ptCtrl = (<any>this.searchProviderFrom).controls.providerType;
    const individualCtrl = ptCtrl.controls.individual;
    const organizationCtrl = ptCtrl.controls.organization;

    // initialize value changes stream
    const typeChanges = ptCtrl.controls.type.valueChanges;

    // subscribe to the stream
    typeChanges.subscribe(providerType => {
      if (providerType === this.PROVIDER_TYPE.INDIVIDUAL) {
        Object.keys(individualCtrl.controls).forEach(key => {
          individualCtrl.controls[key].setValidators(this.initProviderIndividualModel()[key][1]);
          individualCtrl.controls[key].updateValueAndValidity();
        });

        Object.keys(organizationCtrl.controls).forEach(key => {
          organizationCtrl.controls[key].setValue(null);
          organizationCtrl.controls[key].setValidators(null);
          organizationCtrl.controls[key].updateValueAndValidity();
        });
      }

      if (providerType === this.PROVIDER_TYPE.ORGANIZATION) {
        Object.keys(individualCtrl.controls).forEach(key => {
          individualCtrl.controls[key].setValue(null);
          individualCtrl.controls[key].setValidators(null);
          individualCtrl.controls[key].updateValueAndValidity();
        });

        Object.keys(organizationCtrl.controls).forEach(key => {
          organizationCtrl.controls[key].setValidators(this.initProviderOrganizationModel()[key][1]);
          organizationCtrl.controls[key].updateValueAndValidity();
        });
      }
    });
  }

  public setLocatingType(type: string): void {
    // update payment method type value
    const ctrl: FormControl = (<any>this.searchProviderFrom).controls.locatingType.controls.type;
    ctrl.setValue(type);
  }

  public setProviderType(type: string): void {
    // update payment method type value
    const ctrl: FormControl = (<any>this.searchProviderFrom).controls.providerType.controls.type;
    ctrl.setValue(type);
  }

  public isStateCityType(): boolean {
    return this.searchProviderFrom.value.locatingType.type === this.LOCATING_TYPE.STATE_CITY;
  }

  public isIndividualProviderType(): boolean {
    return this.searchProviderFrom.value.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL;
  }

  public resetAccordionTab(): void {
    this.accordionTab = true;
  }

  public clearForm(): void {
    this.searchProviderFrom.reset();
    this.setLocatingType(this.LOCATING_TYPE.STATE_CITY);
    this.setProviderType(this.PROVIDER_TYPE.INDIVIDUAL);
  }

  public searchProviders(): void {
    let requestParams: ProviderRequestQuery = this.prepareSearchProviders();

    this.providerService.searchProviders(requestParams)
      .subscribe(res => {
        this.searchResponse = res;
        this.hasSearchResult = true;
      });
    this.accordionTab = false;
  }

  private prepareSearchProviders(): ProviderRequestQuery {
    const formModel = this.searchProviderFrom.value;
    const individualRequestParams: ProviderRequestQuery = {
      state: formModel.locatingType.stateCity.state,
      city: formModel.locatingType.stateCity.city,
      zipCode: formModel.locatingType.zip.zipCode,
      lastName: formModel.providerType.individual.lastName,
      firstName: formModel.providerType.individual.firstName,
      genderCode: formModel.providerType.individual.genderCode,
      phone: formModel.providerType.individual.phone
    };

    if (formModel.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      return individualRequestParams;
    } else {
      let organizationRequestParams: ProviderRequestQuery = {
        orgName: formModel.providerType.organization.orgName,
        phone: formModel.providerType.organization.phone
      };
      return Object.assign(individualRequestParams, organizationRequestParams);
    }
  }
}
