import {Component, Input, OnInit} from "@angular/core";
import {ApiUrlService} from "../../shared/api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {Patient} from "app/patient/shared/patient.model";
import {Observable} from "rxjs/Observable";
import {ConsentService} from "../shared/consent.service";
import {PageableData} from "../../shared/pageable-data.model";
import {Consent} from "../shared/consent.model";

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
}
