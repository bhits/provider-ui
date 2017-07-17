import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../shared/api-url.service";
import {ExceptionService} from "../shared/exception.service";
import {Observable} from "rxjs/Observable";
import {ProviderPermissions} from "./provider-permissions.model";
import {Oauth2Client} from "app/core/oauth2-client.model";
import {SessionStorageService} from "app/security/shared/session-storage.service";
import {Config} from "app/core/config.model";

@Injectable()
export class ConfigService {
  private C2S_CONFIG_KEY: string = 'c2s-config';

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http,
              private sessionStorageService: SessionStorageService) {
  }

  public getConfig(): Observable<Config> {
    const resourceUrl = this.apiUrlService.getConfigBaseUrl();
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Config>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getBasicAuthorizationHeader(): Observable<string> {
    const resourceUrl = this.apiUrlService.getConfigBaseUrl().concat("/basicAuthorizationHeader");
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Oauth2Client>(resp.json()))
      .map(oauth2Client => oauth2Client.client.basicAuthorizationHeader)
      .catch(this.exceptionService.handleError);
  }

  public getProviderPermissions(): Observable<ProviderPermissions> {
    const resourceUrl = this.apiUrlService.getConfigBaseUrl().concat("/providerPermissions");
    return this.http.get(resourceUrl)
      .map((resp: Response) => <ProviderPermissions>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getConfigInSessionStorage(): Config {
    return this.sessionStorageService.retrieve(this.C2S_CONFIG_KEY);
  }

  public setConfigInSessionStorage(config: Config): void {
    this.sessionStorageService.store(this.C2S_CONFIG_KEY, config);
  }

  public deleteConfigInSessionStorage() {
    this.sessionStorageService.clear(this.C2S_CONFIG_KEY);
  }
}
