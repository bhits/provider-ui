import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../shared/api-url.service";
import {ExceptionService} from "../shared/exception.service";
import {Observable} from "rxjs/Observable";
import {SessionStorageService} from "app/security/shared/session-storage.service";
import {Config} from "app/core/config.model";
import {NotificationService} from "app/shared/notification.service";
import {TokenService} from "../security/shared/token.service";

@Injectable()
export class ConfigService {
  private C2S_CONFIG_KEY: string = 'c2s-config';

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http,
              private notificationService: NotificationService,
              private tokenService: TokenService,
              private sessionStorageService: SessionStorageService) {
  }

  public getConfig(): Observable<Config> {
    const resourceUrl = this.apiUrlService.getConfigBaseUrl();
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Config>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getConfigInSessionStorage(): Config {
    let config: Config = this.sessionStorageService.retrieve(this.C2S_CONFIG_KEY);
    if (config != null) {
      return config;
    } else {
      // If logged in using master-ui then get config
      if (this.tokenService.getProfileToken() && this.tokenService.getAccessToken()) {
        // Get config data once login
        this.getConfig().subscribe(
          (config: Config) => {
            this.setConfigInSessionStorage(config);
          },
          (err) => {
            this.notificationService.i18nShow("SHARED.CONFIGURATION_SERVICE_ERROR");
          }
        );
      } else {
        this.notificationService.i18nShow("SHARED.CONFIGURATION_SERVICE_ERROR");
      }
    }
  }

  public setConfigInSessionStorage(config: Config): void {
    this.sessionStorageService.store(this.C2S_CONFIG_KEY, config);
  }
}
