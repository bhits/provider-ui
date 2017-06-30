import {Injectable} from "@angular/core";
import {ApiUrlService} from "app/shared/api-url.service";
import {Headers, Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "app/shared/exception.service";
import {Observable} from "rxjs";
import {AuthorizationResponse} from "app/security/shared/authorization-response.model";
import {TokenService} from "./token.service";
import {UtilityService} from "../../shared/utility.service";
import {GlobalEventManagementService} from "../../core/global-event-management.service";
import {Profile} from "../../core/profile.model";
import {ProfileService} from "app/security/shared/profile.service";
import {ConfigService} from "../../core/config.service";
import {NotificationService} from "../../shared/notification.service";

@Injectable()
export class AuthenticationService {
  private basicAuthorizationHeader: string;

  constructor(private apiUrlService: ApiUrlService,
              private configService: ConfigService,
              private exceptionService: ExceptionService,
              private globalEventManagementService: GlobalEventManagementService,
              private http: Http,
              private notificationService: NotificationService,
              private profileService: ProfileService,
              private tokenService: TokenService,
              private utilityService: UtilityService) {
    this.configService.getBasicAuthorizationHeader()
      .subscribe(
        (basicAuthorizationHeader: string) => {
          this.basicAuthorizationHeader = basicAuthorizationHeader;
        },
        (error) => {
          this.notificationService.show("Could not load configuration from the server. Please to the Login Page and try again.");
        }
      );
  }

  public login(username: string, password: string): Observable<AuthorizationResponse> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    params.set('grant_type', 'password');
    params.set('response_type', 'token');
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', 'Basic '.concat(this.basicAuthorizationHeader));

    return this.http.post(this.apiUrlService.getUaaTokenUrl(), params, {headers: headers})
      .map((resp: Response) => <AuthorizationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public onLoggedIn(response: AuthorizationResponse): void {
    this.tokenService.setOauthToken(response);
  }

  public logout(): void {
    this.tokenService.deleteAccessToken();
    this.tokenService.deleteUserProfile();
    this.profileService.deleteProfileFromSessionStorage();
    this.globalEventManagementService.setShowHeader(false);
    this.utilityService.navigateTo(this.apiUrlService.getLoginUrl());
  }

  public onGetUserProfileSuccess(profile: Profile) {
    this.globalEventManagementService.setProfile(profile);
    this.utilityService.navigateTo(this.apiUrlService.getHomeUrl());
  }

  public getUserProfile() {
    return this.http.get(this.apiUrlService.getUaaUserInfoUrl())
      .map((resp: Response) => <any>(resp.json()));
  }
}
