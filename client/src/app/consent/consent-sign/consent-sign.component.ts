import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../shared/notification.service";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../shared/utility.service";
import {Patient} from "../../patient/shared/patient.model";
import {BinaryFile} from "../../shared/binary-file.model";
import {ConsentTerms} from "../shared/consent-terms.model";
import {DetailedConsent} from "../shared/detailed-consent.model";
import {ProfileService} from "../../security/shared/profile.service";

@Component({
  selector: 'c2s-consent-sign',
  templateUrl: './consent-sign.component.html',
  styleUrls: ['./consent-sign.component.scss']
})
export class ConsentSignComponent implements OnInit {
  public title: string = "eSignature";
  public consent: DetailedConsent;
  public attestationTermsWithNames: string;
  public checked: boolean = false;
  public isAuthenticated: boolean = false;
  public password: string;
  public inValid: boolean;
  public usernameTranslateParam: any;
  public selectedPatientName: any;
  public userFullName: string;
  public selectedPatient: Patient;
  private consentListUrl: string;

  constructor(private authenticationService: AuthenticationService,
              private consentService: ConsentService,
              private notificationService: NotificationService,
              private profileService: ProfileService,
              private route: ActivatedRoute,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.selectedPatient = this.route.snapshot.parent.data['patient'];
    this.consentListUrl = "/patients".concat("/" + this.selectedPatient.id);
    let fullName: string = this.utilityService.getFullName(this.selectedPatient);
    this.selectedPatientName = {name: fullName};

    this.route.params.subscribe(params => {
      if (params['consentId']) {
        this.consent = this.route.snapshot.data['consent'];
      }
    });
    this.userFullName = this.profileService.getFullName();
    this.usernameTranslateParam = {name: this.userFullName};
    this.attestationTermsWithNames = this.replaceConsentAttestationTermsWithNames(this.route.snapshot.data['consentTerms']);
  }

  public cancel(): void {
    this.utilityService.navigateTo(this.consentListUrl);
  }

  public navigateTo(): void {
    this.utilityService.navigateTo(this.consentListUrl);
  }

  public clearCheckbox(): void {
    if (this.isAuthenticated != true) {
      this.checked = false;
      this.inValid = false;
    }
  }

  public toAuthenticate(dialog: any): void {
    const username: string = this.profileService.getUsername();
    this.authenticationService.login(username, this.password)
      .subscribe(
        () => {
          this.inValid = false;
          this.isAuthenticated = true;
          dialog.close();
        },
        () => {
          this.inValid = true;
          this.password = null;
        }
      );
  }

  public attestConsent(dialog: any): void {
    this.consentService.attestConsent(this.selectedPatient.mrn, this.consent.id)
      .subscribe(
        () => {
          dialog.open();
        },
        err => {
          this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.FAILED_SIGN_CONSENT");
          console.log(err);
        }
      );
  }

  public getSignedConsentPdf(): void {
    const namePrefix: string = "Signed_Consent";
    this.consentService.getSignedConsentPdf(this.selectedPatient.mrn, this.consent.id)
      .subscribe(
        (signedPdf: BinaryFile) => {
          this.utilityService.downloadFile(signedPdf.content, `${namePrefix}_${this.consent.id}.pdf`, signedPdf.contentType);
          this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.SUCCESS_DOWNLOAD_SIGNED_CONSENT");
        },
        err => {
          this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.FAILED_DOWNLOAD_SIGNED_CONSENT");
          console.log(err);
        }
      );
  }

  private replaceConsentAttestationTermsWithNames(consentTerms: ConsentTerms): string {
    let termsWithProviderAndPatientNames: string;
    const terms: string = consentTerms.text;
    const patientNameKey: string = "${ATTESTER_FULL_NAME}";
    const providerNameKey: string = "${PROVIDER_FULL_NAME}";
    termsWithProviderAndPatientNames = terms.replace(patientNameKey, this.selectedPatientName.name);

    if (termsWithProviderAndPatientNames.includes(providerNameKey)) {
      termsWithProviderAndPatientNames = termsWithProviderAndPatientNames.replace(providerNameKey, this.userFullName);
    }
    return termsWithProviderAndPatientNames;
  }
}
