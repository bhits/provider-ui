import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Provider} from "../../provider/shared/provider.model";
import {ConsentService} from "app/consent/shared/consent.service";
import {Consent} from "app/consent/shared/consent.model";

@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.scss']
})
export class SelectProviderComponent implements OnInit {
  @Input() public title: string;
  @Input() public dialogTitle: string;
  @Input() public isAuthorizedProviders: boolean;
  public patientProviders: Provider[];
  public consentProvider: Provider;
  public selectedProviderNpi: string;
  private patientConsent: Consent;

  constructor(private consentService: ConsentService,
              private route: ActivatedRoute) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.patientConsent = consent;
      }
    });
  }

  ngOnInit() {
    this.patientProviders = this.route.snapshot.data['providers'];
    //Consent Edit Mode
    if (this.patientConsent.id != null) {
      //Assign consent providers
      this.assignConsentProviders();
    }
  }

  public isSelectedProvider(npi: string) {
    if ((this.isAuthorizedProviders) && this.patientConsent.toProviders[0]) {
      return (this.patientConsent.toProviders[0].value === npi);
    } else if ((!this.isAuthorizedProviders) && this.patientConsent.fromProviders[0]) {
      return (this.patientConsent.fromProviders[0].value === npi);
    }
    return false;
  }

  public addSelectedProvider(dialog: any) {
    dialog.close();
    this.consentProvider = this.consentService.getProviderByNPI(this.patientProviders, this.selectedProviderNpi);
    if (this.isAuthorizedProviders) {
      this.patientConsent.fromProviders = this.consentProvider.identifiers;
      this.consentService.setConsentEmitter(this.patientConsent);
    } else {
      this.patientConsent.toProviders = this.consentProvider.identifiers;
      this.consentService.setConsentEmitter(this.patientConsent);
    }
  }

  private assignConsentProviders() {
    if (this.isAuthorizedProviders) {
      this.consentProvider.identifiers = this.patientConsent.fromProviders;
    } else {
      this.consentProvider.identifiers = this.patientConsent.toProviders;
    }
  }
}
