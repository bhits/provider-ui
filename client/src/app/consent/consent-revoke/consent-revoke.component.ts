import {Component, OnInit} from '@angular/core';
import {Consent} from "../shared/consent.model";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {UtilityService} from "../../shared/utility.service";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../shared/notification.service";
import {Patient} from "../../patient/shared/patient.model";
import {ConsentRevocation} from "../shared/consent-revocation.model";
import {BinaryFile} from "../../shared/binary-file.model";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../../security/shared/profile.service";

@Component({
  selector: 'c2s-consent-revoke',
  templateUrl: './consent-revoke.component.html',
  styleUrls: ['./consent-revoke.component.scss']
})
export class ConsentRevokeComponent implements OnInit {
  public title: string = "Revoke Consent";
  public checked: boolean = false;
  public isAuthenticated: boolean = false;
  public password: string;
  public inValid: boolean;
  public consent: Consent;
  public consentRevocationTerms: string;
  public usernameTranslateParam: any;
  public selectedPatientName: any;
  public selectedPatient: Patient;
  private consentListUrl: string;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private consentService: ConsentService,
              private profileService: ProfileService,
              private utilityService: UtilityService,
              private notificationService: NotificationService) {
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

    this.consentRevocationTerms = this.route.snapshot.data['consentRevocationTerms'].text;
    let userFullName: string = this.profileService.getFullName();
    this.usernameTranslateParam = {name: userFullName};
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

  public revokeConsent(dialog: any): void {
    let consentRevocation = new ConsentRevocation(true);
    this.consentService.revokeConsent(consentRevocation, this.selectedPatient.mrn, this.consent.id).subscribe(
      () => {
        dialog.open();
      },
      () => {
        this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.FAILED_REVOKE_CONSENT");
      }
    )
  }

  public navigateTo(): void {
    this.utilityService.navigateTo(this.consentListUrl);
  }

  public cancel(): void {
    this.utilityService.navigateTo(this.consentListUrl);
  }

  public downloadRevokedConsent(): void {
    this.consentService.getRevokedConsentPdf(this.selectedPatient.mrn, this.consent.id)
      .subscribe(
        (revokedPdf: BinaryFile) => this.onSuccess(revokedPdf, "Revoked_consent"),
        (error: any) => this.onError);
  }

  private onSuccess(revokedPdf: BinaryFile, prefix: string): void {
    this.utilityService.downloadFile(revokedPdf.content, `${prefix}_${this.consent.id}.pdf`, revokedPdf.contentType);
    this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.SUCCESS_DOWNLOAD_REVOKED_CONSENT");
  }

  private onError(error: any): void {
    this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.FAILED_DOWNLOAD_REVOKED_CONSENT");
  }
}

