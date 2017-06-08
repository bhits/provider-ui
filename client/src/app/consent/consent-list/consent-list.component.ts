import {Component, Input, OnInit} from "@angular/core";
import {ApiUrlService} from "../../shared/api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {Patient} from "app/patient/shared/patient.model";
import {Observable} from "rxjs/Observable";
import {ConsentService} from "../shared/consent.service";
import {PageableData} from "../../shared/pageable-data.model";
import {Consent} from "../shared/consent.model";
import {CONSENT_STAGES} from "app/consent/shared/consent-stages.model";
import {ConsentStageOption} from "../shared/consent-stage-option.model";
import {ConsentStageOptionKey} from "app/consent/shared/consent-stage-option-key.enum";
import {BinaryFile} from "../../shared/binary-file.model";
import {NotificationService} from "app/shared/notification.service";

@Component({
  selector: 'c2s-consent-list',
  templateUrl: './consent-list.component.html',
  styleUrls: ['./consent-list.component.scss']
})
export class ConsentListComponent implements OnInit {
  @Input()
  public patient: Patient;
  public totalItems: number = 0;
  public totalPages: number = 0;
  public itemsPerPage: number = 0;
  public currentPage: number = 1;
  public noConsent: boolean = false;
  public loading: boolean = false;
  public asyncConsents: Observable<Consent[]>;

  private detailsVisible: boolean = false;
  private height: number = 0;

  constructor(private apiUrlService: ApiUrlService,
              private consentService: ConsentService,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  public getPage(page: number) {
    this.loading = true;
    this.asyncConsents = this.consentService.getConsents(this.patient.mrn, page - 1)
      .do((patients: PageableData<Consent>) => {
        this.noConsent = patients.totalElements === 0;
        this.totalItems = patients.totalElements;
        this.totalPages = patients.totalPages;
        this.itemsPerPage = patients.size;
        this.currentPage = patients.number + 1;
        this.loading = false;
      })
      .map(pageableConsent => pageableConsent.content);
  }

  public redirectToPatientConsentsCreate(): void {
    const searchPatientProvidersUrl: string = "/patients".concat("/" + this.patient.id).concat(this.apiUrlService.getPatientConsentsCreateUrl());
    this.utilityService.navigateTo(searchPatientProvidersUrl)
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

  public hasDoNotShareSensitivityPolicyCodes(consent: Consent): boolean {
    if (consent != null && consent.shareSensitivityCategories != null) {
      return consent.shareSensitivityCategories.length > 0;
    }
  }

  public getConsentStageOptions(consent: Consent): ConsentStageOption[] {
    return CONSENT_STAGES
      .filter(consentStage => consentStage.consentStage === consent.consentStage)
      .map(consentStage => consentStage.options)
      .pop();
  }

  public invokeAction(consent: Consent, consentOption: ConsentStageOption, consentOptionsDialog: any, deleteConfirmationDialog: any) {
    switch (consentOption.key) {
      case ConsentStageOptionKey.DELETE:
        deleteConfirmationDialog.open();
        break;
      case ConsentStageOptionKey.DOWNLOAD_SAVED_PDF:
        this.consentService.getSavedConsentPdf(this.patient.mrn, consent.id)
          .subscribe(
            (savedPdf: BinaryFile) => {
              consentOptionsDialog.close();
              this.utilityService.downloadFile(savedPdf.content, `${"Saved_Consent"}_${consent.id}.pdf`, savedPdf.contentType);
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

  public getRouterLink(consent: Consent, consentOption: ConsentStageOption): any {
    return consentOption.routerLink ? [consentOption.routerLink, consent.id] : '.'
  }

  public confirmDeleteConsent(dialog: any, consent: Consent) {
    dialog.close();
    this.consentService.deleteConsent(this.patient.mrn, consent.id)
      .subscribe(
        () => {
          // this.consents = this.consents.filter(consent => consent['id'] !== consent.id);
          this.notificationService.show("Success in deleting consent.");
        },
        err => {
          this.notificationService.show("Failed to delete the consent, please try again later...");
          console.log(err);
        });
  }
}
