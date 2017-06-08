import {Component, Input, OnInit} from "@angular/core";
import {Patient} from "../../patient/shared/patient.model";
import {UtilityService} from "../../shared/utility.service";
import {ApiUrlService} from "../../shared/api-url.service";
import {Observable} from "rxjs/Observable";
import {Consent} from "../shared/consent.model";
import {PageableData} from "../../shared/pageable-data.model";
import {ConsentService} from "../shared/consent.service";

@Component({
  selector: 'c2s-consent-card-list',
  templateUrl: './consent-card-list.component.html',
  styleUrls: ['./consent-card-list.component.scss']
})
export class ConsentCardListComponent implements OnInit {
  @Input()
  public patient: Patient;
  public totalItems: number = 0;
  public totalPages: number = 0;
  public itemsPerPage: number = 0;
  public currentPage: number = 1;
  public noConsent: boolean = false;
  public loading: boolean = false;
  public asyncConsents: Observable<Consent[]>;

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

  public onDeleteConsent(consentId: number) {
    this.asyncConsents = this.asyncConsents.filter(consent => consent['id'] !== consentId)
  }
}
