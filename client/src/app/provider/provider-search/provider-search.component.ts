import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationRules} from "app/shared/validation-rules.model";

@Component({
  selector: 'c2s-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.scss']
})
export class ProviderSearchComponent implements OnInit {
  public searchProviderFrom: FormGroup;
  public accordionTab: boolean = true;
  public title: string = "Add Providers";

  //Todo: Get from Backend
  public states = [
    {stateCode: 'AZ', stateValue: 'ARIZONA'},
    {stateCode: 'DC', stateValue: 'DISTRICT OF COLUMBIA'},
    {stateCode: 'MD', stateValue: 'MARYLAND'},
    {stateCode: 'VA', stateValue: 'VIRGINIA'}
  ];

  public genderGroup = [
    {genderCode: 'M', genderValue: 'Male'},
    {genderCode: 'F', genderValue: 'Female'}
  ];

  public PROVIDER_TYPE = {
    INDIVIDUAL: 'individual',
    ORGANIZATION: 'organization'
  };

  public LOCATING_TYPE = {
    STATE_CITY: 'stateCity',
    ZIP: 'zip'
  };

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
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
      city: ['',
        [
          Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH),
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
      lastName: ['',
        [
          Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH),
          Validators.required
        ]
      ],
      firstName: ['',
        [
          Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH)
        ]
      ],
      genderCode: '',
      phone: ['', Validators.pattern(ValidationRules.PHONE_PATTERN)]
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
      phone: ['', Validators.pattern(ValidationRules.PHONE_PATTERN)]
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
}
