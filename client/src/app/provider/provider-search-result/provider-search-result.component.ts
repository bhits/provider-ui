import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";
import {FlattenedSmallProvider} from "app/shared/flattened-small-provider.model";
import {Observable} from "rxjs/Observable";
import {ProviderService} from "app/provider/shared/provider.service";
import {UtilityService} from "../../shared/utility.service";
import {Provider} from "app/provider/shared/provider.model";
import {NotificationService} from "app/shared/notification.service";
import {Patient} from "app/patient/shared/patient.model";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['./provider-search-result.component.scss']
})
export class ProviderSearchResultComponent implements OnInit, OnChanges {
  @Input() providerResult: ProviderSearchResponse;

  private providerList: Provider[] = [];
  selectedProviders: FlattenedSmallProvider[] = [];
  asyncProviderResult: Observable<FlattenedSmallProvider[]>;
  private searchResponse: ProviderSearchResponse;

  itemsPerPage: number;
  currentPage: number = 1;
  totalItems: number;
  private totalPages: number;
  loading: boolean;

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private providerService: ProviderService,
              private utilityService: UtilityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // only run when property "providerResult" real data kicks in
    if (changes['providerResult']) {
      this.searchResponse = this.providerResult;
      this.getPage(this.currentPage);
    }
  }

  ngOnInit() {
    let patient: Patient = this.route.snapshot.data['patient'];
    this.providerService.getProviders(patient.mrn)
      .subscribe(
        (providers) => {
          this.providerList = providers;
        },
        err => {
          this.notificationService.show("Failed in getting providers.");
        }
      );
  }

  public getPage(page: number) {
    const SEARCH_RESPONSE_KEY: string = "providers";

    this.loading = true;
    if (this.searchResponse != null) {
      this.asyncProviderResult = this.providerService.loadNewSearchProvidersResult(page - 1, this.searchResponse)
        .do((providerSearchResponse: ProviderSearchResponse) => {
          this.totalItems = providerSearchResponse.page.totalElements;
          this.totalPages = providerSearchResponse.page.totalPages;
          this.itemsPerPage = providerSearchResponse.page.size;
          this.currentPage = providerSearchResponse.page.number + 1;
          this.loading = false;
        })
        .map(providerSearchResponse =>
          this.utilityService.convertJsonObjToStrMap(providerSearchResponse._embedded).get(SEARCH_RESPONSE_KEY));
    }
  }

  public addProviders(provider: FlattenedSmallProvider) {
    this.selectedProviders.push(provider);
  }

  public isInProviderList(provider: FlattenedSmallProvider): boolean {
    return this.providerService.isSearchResultInProviderList(provider, this.providerList);
  }

  public isProviderSelected(provider: FlattenedSmallProvider): boolean {
    if (this.selectedProviders != null) {
      return this.selectedProviders.filter((p) => provider.npi === p.npi).length > 0;
    }
  }

  public canSelectProvider(provider: FlattenedSmallProvider): boolean {
    return !this.isProviderSelected(provider) && !this.isInProviderList(provider);
  }
}
