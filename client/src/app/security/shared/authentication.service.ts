import {Injectable} from "@angular/core";
import {ApiUrlService} from "app/shared/api-url.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AuthorizationResponse} from "app/security/shared/authorization-response.model";
import {TokenService} from "./token.service";
import {UtilityService} from "../../shared/utility.service";
import {GlobalEventManagementService} from "../../core/global-event-management.service";
import {ConfigService} from "../../core/config.service";
import {NotificationService} from "../../shared/notification.service";
import {Config} from "../../core/config.model";
import {LoginRequest} from "./login-request.model";

@Injectable()
export class AuthenticationService {
  private ACCOUNT_LOCKED_MESSAGE: string = "Your account has been locked because of too many failed attempts to login.";
  private BAD_CREDENTIAL_MESSAGE = "Bad credential Exception.";

  constructor(private apiUrlService: ApiUrlService,
              private configService: ConfigService,
              private globalEventManagementService: GlobalEventManagementService,
              private http: Http,
              private notificationService: NotificationService,
              private tokenService: TokenService,
              private utilityService: UtilityService) {
  }

  public login(username: string, password: string): Observable<AuthorizationResponse> {
    return this.http.post(this.apiUrlService.getUaaBaseUrl().concat("/login"), new LoginRequest(username, password))
      .map((resp: Response) => <AuthorizationResponse>(resp.json()));
  }

  public onLoggedIn(response: AuthorizationResponse): void {
    this.tokenService.setAccessToken(response);

    // Get config data once login
    this.configService.getConfig().subscribe(
      (config: Config) => {
        this.configService.setConfigInSessionStorage(config);
      },
      () => {
        this.notificationService.i18nShow("SHARED.CONFIGURATION_SERVICE_ERROR");
      }
    );
  }

  public onGetUserProfileSuccess(redirectUrl: string): void {
    if (redirectUrl != null) {
      this.utilityService.navigateTo(redirectUrl);
    } else {
      this.utilityService.navigateTo(this.apiUrlService.getHomeUrl());
    }
  }

  public onGetUserProfileFailure(): void {
    this.globalEventManagementService.setShowHeader(false);
    this.tokenService.deleteAccessToken();
  }

  public logout(): void {
    this.globalEventManagementService.setShowHeader(false);
    this.clearSessionStorageAndRedirectToLogin();
  }

  private clearSessionStorageAndRedirectToLogin(): void {
    let masterUiLoginUrl = this.tokenService.getMasterUiLoginUrl();
    sessionStorage.clear();
    if (masterUiLoginUrl) {
      this.utilityService.redirectInSameTab(masterUiLoginUrl);
    } else {
      this.utilityService.navigateTo(this.apiUrlService.getLoginUrl());
    }
  }

  public isAccountLocked(msg: string): boolean {
    return msg === this.ACCOUNT_LOCKED_MESSAGE;
  }

  public isBadCredentials(msg: string): boolean {
    return msg === this.BAD_CREDENTIAL_MESSAGE;
  }
}
