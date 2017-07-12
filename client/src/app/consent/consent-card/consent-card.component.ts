import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CONSENT_STAGES} from "app/consent/shared/consent-stages.model";
import {ConsentStageOption} from "../shared/consent-stage-option.model";
import {ConsentStageOptionKey} from "../shared/consent-stage-option-key.enum";
import {BinaryFile} from "../../shared/binary-file.model";
import {ConsentService} from "app/consent/shared/consent.service";
import {NotificationService} from "app/shared/notification.service";
import {Patient} from "app/patient/shared/patient.model";
import {DetailedConsent} from "../shared/detailed-consent.model";
import {SampleDocumentInfo} from "../shared/sample-document-info.model";
import {TryPolicyService} from "app/consent/shared/try-policy.service";
import {ProviderPermissions} from "../../core/provider-permissions.model";

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
  private consentOptions: ConsentStageOption[];
  private selectedPatient: Patient;
  private detailsVisible: boolean = false;
  private height: number = 0;
  public applyTryPolicyForm: FormGroup;
  public sampleDocuments: SampleDocumentInfo[];
  private providerPermissions: ProviderPermissions;

  constructor(private tryPolicyService: TryPolicyService,
              private consentService: ConsentService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.providerPermissions = this.route.snapshot.data['providerPermissions'];
    this.selectedPatient = this.route.snapshot.data['patient'];
    this.sampleDocuments = this.route.snapshot.data['sampleDocuments'];
    this.consentOptions = CONSENT_STAGES
      .filter(consentStage => consentStage.consentStage === this.consent.consentStage)
      .map(consentStage => consentStage.options)
      .pop();
    this.applyTryPolicyForm = this.initApplyTryPolicyFormGroup();
  }

  private initApplyTryPolicyFormGroup() {
    return this.formBuilder.group({
      sampleDocument: [null, Validators.required],
      purposeOfUse: [null, Validators.required],
    });
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

  public invokeAction(consentOption: ConsentStageOption, consentOptionsDialog: any, deleteConfirmationDialog: any, applyTryPolicyDialog: any) {
    switch (consentOption.key) {
      case ConsentStageOptionKey.APPLY_TRY_POLICY:
        applyTryPolicyDialog.open();
        break;
      case ConsentStageOptionKey.DELETE:
        deleteConfirmationDialog.open();
        break;
      case ConsentStageOptionKey.DOWNLOAD_SAVED_PDF:
        this.consentService.getSavedConsentPdf(this.selectedPatient.mrn, this.consent.id)
          .subscribe((savedPdf: BinaryFile) => this.consentService
              .handleDownloadSuccess(savedPdf, this.consent.id, consentOptionsDialog, "Saved_Consent", "CONSENT.NOTIFICATION_MSG.SUCCESS_DOWNLOAD_SAVED_CONSENT"),
            (err) => this.consentService.handleDownloadError("CONSENT.NOTIFICATION_MSG.FAILED_DOWNLOAD_SAVED_CONSENT")
          );
        break;
      case ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF:
        this.consentService.getSignedConsentPdf(this.selectedPatient.mrn, this.consent.id)
          .subscribe((signedPdf: BinaryFile) => this.consentService.handleDownloadSuccess(signedPdf, this.consent.id, consentOptionsDialog, "Signed_Consent", "CONSENT.NOTIFICATION_MSG.SUCCESS_DOWNLOAD_SIGNED_CONSENT"),
            (err) => this.consentService.handleDownloadError("CONSENT.NOTIFICATION_MSG.FAILED_DOWNLOAD_SIGNED_CONSENT")
          );
        break;
      case ConsentStageOptionKey.DOWNLOAD_REVOKED_PDF:
        this.consentService.getRevokedConsentPdf(this.selectedPatient.mrn, this.consent.id)
          .subscribe(
            (revokedPdf: BinaryFile) => this.consentService
              .handleDownloadSuccess(revokedPdf, this.consent.id, consentOptionsDialog, "Revoked_Consent", "CONSENT.NOTIFICATION_MSG.SUCCESS_DOWNLOAD_REVOKED_CONSENT"),
            (err) => this.consentService.handleDownloadError("CONSENT.NOTIFICATION_MSG.FAILED_DOWNLOAD_REVOKED_CONSENT")
          );
        break;
    }
  }

  public selectConsentMethodOption(consentOption: ConsentStageOption): boolean {
    return consentOption.isMethod;
  }

  private displayOnProviderUI(consentOption: ConsentStageOption): boolean {

    let result: boolean;

    switch (consentOption.key) {
      case ConsentStageOptionKey.SIGN:
        result = this.providerPermissions.consentSignEnabled;
        break;

      case ConsentStageOptionKey.REVOKE:
        result = this.providerPermissions.consentRevokeEnabled;
        break;

      default:
        result = true;
    }
    return result;
  }

  public getRouterLink(consentOption: ConsentStageOption): any {
    if (consentOption.key === ConsentStageOptionKey.SIGN ||
      consentOption.key === ConsentStageOptionKey.REVOKE) {
      return consentOption.routerLink ? ["/patients".concat("/" + this.selectedPatient.id).concat("/consents/" + this.consent.id).concat(consentOption.routerLink)] : '.'
    }

    return consentOption.routerLink ? ["/patients".concat("/" + this.selectedPatient.id).concat(consentOption.routerLink), this.consent.id] : '.'
  }

  public confirmDeleteConsent(dialog: any): void {
    dialog.close();
    this.consentService.deleteConsent(this.selectedPatient.mrn, this.consent.id)
      .subscribe(
        () => {
          this.deleteConsent.emit(this.consent.id);
          this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.SUCCESS_DELETE_CONSENT");
        },
        err => {
          this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.FAILED_DELETE_CONSENT");
        });
  }

  public applyTryPolicy(applyTryPolicyDialog: any): void {
    applyTryPolicyDialog.close();
    const formModel = this.applyTryPolicyForm.value;
    this.tryPolicyService.applyTryPolicyUseSampleDoc(this.selectedPatient.mrn, this.consent.id, formModel.purposeOfUse, formModel.sampleDocument)
      .subscribe(
        (tryPolicyResponse) => {
          this.tryPolicyService.handleApplyTryPolicySuccess(tryPolicyResponse);
        },
        err => {
          this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.FAILED_APPLY_TRY_POLICY");
        });
  }

  public backToOptions(applyTryPolicyDialog: any, consentOptionsDialog: any): void {
    applyTryPolicyDialog.close();
    consentOptionsDialog.open();
  }

  public getEnabledConsentOptions(): ConsentStageOption[]{
    return this.consentOptions.filter(consentOption => this.displayOnProviderUI(consentOption));
  }
}
