import {Component, OnInit} from "@angular/core";
import {Patient} from "../../patient/shared/patient.model";
import {UtilityService} from "../../shared/utility.service";
import {ApiUrlService} from "../../shared/api-url.service";
import {Observable} from "rxjs/Observable";
import {PageableData} from "../../shared/pageable-data.model";
import {ConsentService} from "../shared/consent.service";
import {DetailedConsent} from "app/consent/shared/detailed-consent.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'c2s-consent-card-list',
  templateUrl: './consent-card-list.component.html',
  styleUrls: ['./consent-card-list.component.scss']
})
export class ConsentCardListComponent implements OnInit {
  private selectedPatient: Patient;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public noConsent: boolean = false;
  public loading: boolean = false;
  public asyncConsents: Observable<DetailedConsent[]>;

  constructor(private apiUrlService: ApiUrlService,
              private consentService: ConsentService,
              private route: ActivatedRoute,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.selectedPatient = this.route.snapshot.data['patient'];
    this.getPage(this.currentPage);
  }

  public getPage(page: number) {
    this.loading = true;
    this.asyncConsents = this.consentService.getConsents(this.selectedPatient.mrn, page - 1, this.itemsPerPage)
      .do((consents: PageableData<DetailedConsent>) => {
        this.noConsent = consents.totalElements === 0;
        this.totalItems = consents.totalElements;
        this.currentPage = consents.number + 1;
        this.loading = false;
      })
      .map(pageableConsent => pageableConsent.content);
  }

  public redirectToPatientConsentsCreate(): void {
    const searchPatientProvidersUrl: string = "/patients".concat("/" + this.selectedPatient.id).concat(this.apiUrlService.getPatientConsentsCreateUrl());
    this.utilityService.navigateTo(searchPatientProvidersUrl)
  }

  public onDeleteConsent(consentId: number) {
    this.asyncConsents = this.asyncConsents.filter(consent => consent['id'] !== consentId)
  }
}
