import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Consent} from "../shared/consent.model";
import {CONSENT_STAGES} from "app/consent/shared/consent-stages.model";
import {ConsentStageOption} from "../shared/consent-stage-option.model";
import {ConsentStageOptionKey} from "../shared/consent-stage-option-key.enum";
import {BinaryFile} from "../../shared/binary-file.model";
import {ConsentService} from "app/consent/shared/consent.service";
import {UtilityService} from "app/shared/utility.service";
import {NotificationService} from "app/shared/notification.service";
import {Patient} from "app/patient/shared/patient.model";

@Component({
  selector: 'c2s-consent-card',
  templateUrl: './consent-card.component.html',
  styleUrls: ['./consent-card.component.scss']
})
export class ConsentCardComponent implements OnInit {
  @Input()
  public consent: Consent;
  @Input()
  public patient: Patient;
  @Output()
  public deleteConsent = new EventEmitter<number>();
  private detailsVisible: boolean = false;
  private height: number = 0;

  constructor(private consentService: ConsentService,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
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

  public getConsentStageOptions(): ConsentStageOption[] {
    return CONSENT_STAGES
      .filter(consentStage => consentStage.consentStage === this.consent.consentStage)
      .map(consentStage => consentStage.options)
      .pop();
  }

  public invokeAction(consentOption: ConsentStageOption, consentOptionsDialog: any, deleteConfirmationDialog: any) {
    switch (consentOption.key) {
      case ConsentStageOptionKey.DELETE:
        deleteConfirmationDialog.open();
        break;
      case ConsentStageOptionKey.DOWNLOAD_SAVED_PDF:
        this.consentService.getSavedConsentPdf(this.patient.mrn, this.consent.id)
          .subscribe(
            (savedPdf: BinaryFile) => {
              consentOptionsDialog.close();
              this.utilityService.downloadFile(savedPdf.content, `${"Saved_Consent"}_${this.consent.id}.pdf`, savedPdf.contentType);
              this.notificationService.show("Success in downloading consent.");
            },
            err => {
              this.notificationService.show("Failed to add the provider, please try again later...");
              console.log(err);
            }
          );
        break;
    }
  }

  public selectConsentMethodOption(consentOption: ConsentStageOption): boolean {
    return consentOption.isMethod;
  }

  public getRouterLink(consentOption: ConsentStageOption): any {
    return consentOption.routerLink ? [consentOption.routerLink, this.consent.id] : '.'
  }

  public confirmDeleteConsent(dialog: any) {
    dialog.close();
    this.consentService.deleteConsent(this.patient.mrn, this.consent.id)
      .subscribe(
        () => {
          this.deleteConsent.emit(this.consent.id);
          this.notificationService.show("Success in deleting consent.");
        },
        err => {
          this.notificationService.show("Failed to delete the consent, please try again later...");
          console.log(err);
        });
  }
}
