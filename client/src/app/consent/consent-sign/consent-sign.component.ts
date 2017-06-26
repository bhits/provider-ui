import { Component, OnInit } from '@angular/core';
import {Consent} from "../shared/consent.model";
import {Profile} from "../../core/profile.model";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../shared/notification.service";
import {ProfileService} from "../../security/shared/profile.service";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../shared/utility.service";
import {TranslateService} from "@ngx-translate/core";
import {TokenService} from "../../security/shared/token.service";
import {Patient} from "../../patient/shared/patient.model";
import {BinaryFile} from "../../shared/binary-file.model";
import {ConsentTerms} from "../shared/consent-terms.model";
import {DetailedConsent} from "../shared/detailed-consent.model";

@Component({
  selector: 'c2s-consent-sign',
  templateUrl: './consent-sign.component.html',
  styleUrls: ['./consent-sign.component.scss']
})
export class ConsentSignComponent implements OnInit {
  public title: string = "eSignature";
  public consent: DetailedConsent;
  public profile: Profile;
  public termsWithUserName: string;
  public checked: boolean = false;
  public isAuthenticated: boolean = false;
  public password: string;
  public inValid: boolean;
  username: any;
  public selectedPatientName: any;
  private selectedPatient: Patient;
  private consentListUrl: string;

  constructor(private authenticationService: AuthenticationService,
              private consentService: ConsentService,
              private notificationService: NotificationService,
              private tokenService: TokenService,
              private profileService: ProfileService,
              private route: ActivatedRoute,
              private utilityService: UtilityService,
              private translate: TranslateService) {
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
    this.profile = this.tokenService.getProfileToken();
    this.username = {name: this.profile.name};
    this.termsWithUserName = this.getConsentAttestationTermWithPatientName(this.route.snapshot.data['consentTerms']);
  }

  public cancel(): void {
    this.utilityService.navigateTo(this.consentListUrl);
  }
  navigateTo() {
    this.utilityService.navigateTo(this.consentListUrl);
  }

  clearCheckbox() {
    if (this.isAuthenticated != true) {
      this.checked = false;
      this.inValid = false;
    }
  }

  toAuthenticate(dialog: any) {
    const username: string = this.profile.userName;
    this.authenticationService.login(username, this.password).toPromise()
      .then(() => {
        this.inValid = false;
        this.isAuthenticated = true;
        dialog.close();
      }).catch(() => {
      this.inValid = true;
      this.password = null;
    });
  }

  attestConsent(dialog: any) {
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

  getSignedConsentPdf() {
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

  private
  getConsentAttestationTermWithPatientName(consentTerms: ConsentTerms): string {
    const terms: string = consentTerms.text;
    const userNameKey: string = "${ATTESTER_FULL_NAME}";
    return terms.replace(userNameKey, this.selectedPatientName.name);
  }

}
