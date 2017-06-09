import {Injectable} from "@angular/core";
import {Headers, Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "../../shared/exception.service";
import {ProviderRequestQuery} from "app/provider/shared/provider-request-query.model";
import {Observable} from "rxjs/Observable";
import {ProviderSearchResponse} from "app/provider/shared/provider-search-response.model";
import {ApiUrlService} from "app/shared/api-url.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";
import {FHIR_US_NPI_SYSTEM, Provider} from "app/provider/shared/provider.model";
import {Identifier} from "app/shared/identifier.model";

@Injectable()
export class ProviderService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private apiUrlService: ApiUrlService,
              private http: Http,
              private exceptionService: ExceptionService) {
  }

  getProviders(patientMrn: string): Observable<Provider[]> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl().concat("/patients/").concat(patientMrn).concat("/providers");
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Provider[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public searchProviders(requestParams: ProviderRequestQuery): Observable<ProviderSearchResponse> {
    const SEARCH_PROVIDERS_URL = this.apiUrlService.getPlsBaseUrl().concat("/providers/search/query");
    let params: URLSearchParams = this.buildRequestParams(requestParams);

    return this.http.get(SEARCH_PROVIDERS_URL, {search: params})
      .map((resp: Response) => <ProviderSearchResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getProviderByNpi(npi: string): Observable<Provider> {
    const SEARCH_PROVIDERS_URL = this.apiUrlService.getPlsBaseUrl().concat("/providers/").concat(npi);
    return this.http.get(SEARCH_PROVIDERS_URL)
      .map((resp: Response) => <ProviderSearchResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public loadNewSearchProvidersResult(page: number, providerResult: ProviderSearchResponse): Observable<ProviderSearchResponse> {
    if (providerResult != null) {
      let pageNumberParam: string = "&page=" + page;
      const NEW_PAGE_URL: string = providerResult._links.self.href.concat(pageNumberParam);

      return this.http.get(NEW_PAGE_URL)
        .map((resp: Response) => <ProviderSearchResponse>(resp.json()))
        .catch(this.exceptionService.handleError);
    }
  }

  public isSearchResultInProviderList(provider: FlattenedSmallProvider, providerList: Provider[]): boolean {
    return providerList
        .filter(
          (p) => provider.npi === p.identifiers
            .filter(id => id.system === FHIR_US_NPI_SYSTEM)
            .map(id => id.value)
            .pop()
        ).length > 0;
  }

  public deleteProvider(patientMrn: string, providerId: number): Observable<void> {
    const DELETE_PROVIDERS_URL = `${this.apiUrlService.getPcmBaseUrl()}/patients/${patientMrn}/providers/${providerId}`;
    return this.http.delete(DELETE_PROVIDERS_URL)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  public addProviders(patientMrn: string, providers: FlattenedSmallProvider[]): Observable<void> {
    const ADD_PROVIDERS_URL = this.apiUrlService.getPcmBaseUrl().concat("/patients/").concat(patientMrn).concat("/providers");
    if (providers != null) {
      let identifiers: Identifier[] = [];
      providers.forEach(
        provider => identifiers.push(new Identifier(FHIR_US_NPI_SYSTEM, provider.npi))
      );
      return this.http
        .post(ADD_PROVIDERS_URL, JSON.stringify({identifiers: identifiers}), {headers: this.headers})
        .map(() => null)
        .catch(this.exceptionService.handleError);
    }
  }

  private buildRequestParams(requestParams: ProviderRequestQuery): URLSearchParams {
    const PROJECTION: string = "FlattenSmallProvider";

    let params: URLSearchParams = new URLSearchParams();
    params.set('state', this.addLikePatternInQueryParameter(requestParams.state));
    params.set('city', this.addLikePatternInQueryParameter(requestParams.city));
    params.set('zipcode', this.addLikePatternInQueryParameter(requestParams.zipCode));
    params.set('firstname', this.addLikePatternInQueryParameter(requestParams.firstName));
    params.set('lastname', this.addLikePatternInQueryParameter(requestParams.lastName));
    params.set('gendercode', this.addLikePatternInQueryParameter(requestParams.genderCode));
    params.set('orgname', this.addLikePatternInQueryParameter(requestParams.orgName));
    params.set('phone', this.addLikePatternInQueryParameter(requestParams.phone));
    params.set('projection', PROJECTION);

    return params;
  }

  private addLikePatternInQueryParameter(requestParam: string): string {
    const LIKE_PATTERN = "%";
    if (requestParam != null && requestParam.length > 0) {
      return LIKE_PATTERN.concat(requestParam, LIKE_PATTERN);
    }
  }

}
