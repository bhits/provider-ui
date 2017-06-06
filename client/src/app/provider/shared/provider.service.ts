import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "../../shared/exception.service";
import {ProviderRequestQuery} from "app/provider/shared/provider-request-query.model";
import {Observable} from "rxjs/Observable";
import {ProviderSearchResponse} from "app/provider/shared/provider-search-response.model";
import {ApiUrlService} from "app/shared/api-url.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

@Injectable()
export class ProviderService {

  constructor(private apiUrlService: ApiUrlService,
              private http: Http,
              private exceptionService: ExceptionService) {
  }

  public searchProviders(requestParams: ProviderRequestQuery): Observable<ProviderSearchResponse> {
    const SEARCH_PROVIDERS_URL = this.apiUrlService.getPlsBaseUrl().concat("/providers/search/query");
    let params: URLSearchParams = this.buildRequestParams(requestParams);

    return this.http.get(SEARCH_PROVIDERS_URL, {search: params})
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

  public isSearchResultInProviderList(provider: FlattenedSmallProvider, providerList: FlattenedSmallProvider[]): boolean {
    return providerList.filter((p) => provider.npi === p.npi).length > 0;
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
