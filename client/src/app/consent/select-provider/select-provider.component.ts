import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Provider} from "../../provider/shared/provider.model";
import {ConsentService} from "app/consent/shared/consent.service";
import {Consent} from "app/consent/shared/consent.model";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.scss']
})
export class SelectProviderComponent implements OnInit {
  @Input() public title: string;
  @Input() public dialogTitle: string;
  @Input() public isAuthorizedProviders: boolean;
  private patientConsent: Consent;

  selectedProviders: ConsentProvider[];
  localeProviders: ConsentProvider[];

  constructor(private consentService: ConsentService,
              private route: ActivatedRoute,
              private utilityService: UtilityService) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.patientConsent = consent;
      }
    });
  }

  ngOnInit() {
    this.localeProviders = this.utilityService.copyObject(this.route.snapshot.data['providers']);
    //Consent Edit Mode
    if (this.patientConsent.id != null) {
      //Assign consent providers
      this.setSelectedProvider();
    }
  }

  public addSelectedProvider(dialog: any) {

    this.selectedProviders = this.utilityService.copyObject(this.localeProviders);
    if (this.isAuthorizedProviders) {
      this.patientConsent.fromProviders = this.consentService.createListOfIdentifiers(this.localeProviders);
      this.consentService.setConsentEmitter(this.patientConsent);
    } else if (!this.isAuthorizedProviders) {
      this.patientConsent.toProviders = this.consentService.createListOfIdentifiers(this.localeProviders);
      this.consentService.setConsentEmitter(this.patientConsent);
    }
    dialog.close();
  }

  setSelectedProvider() {
    if (this.isAuthorizedProviders &&
      (this.patientConsent.fromProviders.identifiers) &&
      (this.patientConsent.fromProviders.identifiers.length > 0)) {
      this.consentService.markSelectedProvidersAsChecked(this.localeProviders, this.patientConsent.fromProviders.identifiers);
      this.selectedProviders = this.utilityService.copyObject(this.localeProviders);
    } else if ((!this.isAuthorizedProviders) &&
      (this.patientConsent.toProviders.identifiers) &&
      (this.patientConsent.toProviders.identifiers.length > 0)) {
      this.consentService.markSelectedProvidersAsChecked(this.localeProviders, this.patientConsent.toProviders.identifiers);
      this.selectedProviders = this.utilityService.copyObject(this.localeProviders);
    }
  }

  isDisabled(provider: ConsentProvider): boolean {
    if ((this.isAuthorizedProviders) && this.patientConsent.toProviders
      && this.patientConsent.toProviders.identifiers && this.patientConsent.toProviders.identifiers.length >0) {
      return  this.consentService.isInList(this.patientConsent.toProviders.identifiers, provider.identifiers);
    } else if ((!this.isAuthorizedProviders) && this.patientConsent.fromProviders &&
      this.patientConsent.fromProviders.identifiers && this.patientConsent.fromProviders.identifiers.length >0) {
      return this.consentService.isInList(this.patientConsent.fromProviders.identifiers, provider.identifiers);
    }
    return false;
  }

  deSelectAll(){
    this.localeProviders.forEach(provider =>{
      provider['selected'] = false;
    })
  }
}
