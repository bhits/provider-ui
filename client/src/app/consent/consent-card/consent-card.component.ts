import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CONSENT_STAGES} from "app/consent/shared/consent-stages.model";
import {ConsentStageOption} from "../shared/consent-stage-option.model";
import {ConsentStageOptionKey} from "../shared/consent-stage-option-key.enum";
import {BinaryFile} from "../../shared/binary-file.model";
import {ConsentService} from "app/consent/shared/consent.service";
import {NotificationService} from "app/shared/notification.service";
import {Patient} from "app/patient/shared/patient.model";
import {DetailedConsent} from "../shared/detailed-consent.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'c2s-consent-card',
  templateUrl: './consent-card.component.html',
  styleUrls: ['./consent-card.component.scss']
})
export class ConsentCardComponent implements OnInit {
  @Input()
  public consent: DetailedConsent;
  @Output()
  public deleteConsent = new EventEmitter<number>();
  public consentOptions: ConsentStageOption[];
  private selectedPatient: Patient;
  private detailsVisible: boolean = false;
  private height: number = 0;

  constructor(private consentService: ConsentService,
              private route: ActivatedRoute,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.selectedPatient = this.route.snapshot.data['patient'];
    this.consentOptions = CONSENT_STAGES
      .filter(consentStage => consentStage.consentStage === this.consent.consentStage)
      .map(consentStage => consentStage.options)
      .pop();
  }

  public toggleDetailsVisible(el: any) {
    this.detailsVisible = !this.detailsVisible;
    this.height = this.height ? 0 : el.scrollHeight;
  }

  public onResize(event: any, el: any) {
    this.height = this.height ? el.scrollHeight : 0;
  }

  public getHeightPx(): string {
    return `${this.height}px`;
  }

  public hasDoNotShareSensitivityPolicyCodes(): boolean {
    if (this.consent != null && this.consent.shareSensitivityCategories != null) {
      return this.consent.shareSensitivityCategories.length > 0;
    }
  }

  public invokeAction(consentOption: ConsentStageOption, consentOptionsDialog: any, deleteConfirmationDialog: any) {
    switch (consentOption.key) {
      case ConsentStageOptionKey.DELETE:
        deleteConfirmationDialog.open();
        break;
      case ConsentStageOptionKey.DOWNLOAD_SAVED_PDF:
        this.consentService.getSavedConsentPdf(this.selectedPatient.mrn, this.consent.id)
          .subscribe((savedPdf: BinaryFile) => this.consentService
              .handleDownloadSuccess(savedPdf, this.consent.id, consentOptionsDialog, "Saved_Consent", "CONSENT.CARD.NOTIFICATION_MSG.SUCCESS_DOWNLOAD_SAVED_CONSENT"),
            (err) => this.consentService.handleDownloadError("CONSENT.CARD.NOTIFICATION_MSG.FAILED_DOWNLOAD_SAVED_CONSENT")
          );
        break;
      case ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF:
        this.consentService.getSignedConsentPdf(this.selectedPatient.mrn, this.consent.id)
          .subscribe((signedPdf: BinaryFile) => this.consentService.handleDownloadSuccess(signedPdf, this.consent.id, consentOptionsDialog, "Signed_Consent", "CONSENT.CARD.NOTIFICATION_MSG.SUCCESS_DOWNLOAD_SIGNED_CONSENT"),
            (err) => this.consentService.handleDownloadError("CONSENT.CARD.NOTIFICATION_MSG.FAILED_DOWNLOAD_SIGNED_CONSENT")
          );
        break;
      case ConsentStageOptionKey.DOWNLOAD_REVOKED_PDF:
        this.consentService.getRevokedConsentPdf(this.selectedPatient.mrn, this.consent.id)
          .subscribe(
            (revokedPdf: BinaryFile) => this.consentService
              .handleDownloadSuccess(revokedPdf, this.consent.id, consentOptionsDialog, "Revoked_Consent", "CONSENT.CARD.NOTIFICATION_MSG.SUCCESS_DOWNLOAD_REVOKED_CONSENT"),
            (err) => this.consentService.handleDownloadError("CONSENT.CARD.NOTIFICATION_MSG.FAILED_DOWNLOAD_REVOKED_CONSENT")
          );
        break;
    }
  }

  public selectConsentMethodOption(consentOption: ConsentStageOption): boolean {
    return consentOption.isMethod;
  }

  public getRouterLink(consentOption: ConsentStageOption): any {
    return consentOption.routerLink ? ["/patients".concat("/" + this.selectedPatient.id).concat(consentOption.routerLink), this.consent.id] : '.'
  }

  public confirmDeleteConsent(dialog: any) {
    dialog.close();
    this.consentService.deleteConsent(this.selectedPatient.mrn, this.consent.id)
      .subscribe(
        () => {
          this.deleteConsent.emit(this.consent.id);
          this.notificationService.i18nShow("CONSENT.CARD.NOTIFICATION_MSG.SUCCESS_DELETE_CONSENT");
        },
        err => {
          this.notificationService.i18nShow("CONSENT.CARD.NOTIFICATION_MSG.FAILED_DELETE_CONSENT");
          console.log(err);
        });
  }
}
