import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../shared/api-url.service";
import {ExceptionService} from "../shared/exception.service";
import {Observable} from "rxjs/Observable";
import {ConfigResponse} from "./config-response.model";

@Injectable()
export class ConfigService {

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getBasicAuthorizationHeader(): Observable<string> {
    const resourceUrl = this.apiUrlService.getConfigBaseUrl().concat("/basicAuthorizationHeader");
    return this.http.get(resourceUrl)
      .map((resp: Response) => <ConfigResponse>(resp.json()))
      .map(configResponse => configResponse.oauth2.client.basicAuthorizationHeader)
      .catch(this.exceptionService.handleError);
  }
}
