import {Injectable} from "@angular/core";
import {SessionStorageService} from "./session-storage.service";
import {AuthorizationResponse} from "./authorization-response.model";
import {Profile} from "../../core/profile.model";

@Injectable()
export class TokenService {
  private ACCESS_TOKEN_KEY: string = 'c2s-access-token';
  private USER_PROFILE_KEY: string = 'c2s-user-profile-token';
  private PROVIDER_COUNT_KEY: string = 'c2s-patient-provider-count';
  private MASTER_UI_LOGIN: string = 'c2s-master-ui-login';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  public getAccessToken(): AuthorizationResponse {
    return this.sessionStorageService.retrieve(this.ACCESS_TOKEN_KEY);
  }

  public setAccessToken(authorizationResponse: AuthorizationResponse): void {
    this.sessionStorageService.store(this.ACCESS_TOKEN_KEY, authorizationResponse);
  }

  public deleteAccessToken(): void {
    this.sessionStorageService.clear(this.ACCESS_TOKEN_KEY);
  }

  public createAuthorizationHeaderObject() {
    let token = this.getAccessToken();
    let customHeaders = {};
    if (token && token['access_token']) {
      let access_token = token['access_token'];
      let access_token_string = 'Bearer ' + access_token;
      customHeaders = {
        "Authorization": access_token_string
      };
    } else {
      // FIXME: Replace this with proper error handling.
      throw new Error("token variable check failed");
    }
    return customHeaders;
  }

  public hasScope(scope: string): boolean {
    if (this.getAccessToken()) {
      const uaaToken: AuthorizationResponse = this.getAccessToken();
      return uaaToken.scope.includes(scope);
    }
    return false;
  }

  public storeUserProfile(userProfile: any) {
    this.sessionStorageService.store(this.USER_PROFILE_KEY, userProfile);
  }

  public getProfileToken(): Profile {
    return this.sessionStorageService.retrieve(this.USER_PROFILE_KEY);
  }

  public deleteUserProfile(): void {
    this.sessionStorageService.clear(this.USER_PROFILE_KEY);
  }

  public createProfileObject(uaaProfile: any): Profile {
    let profile = new Profile();
    profile.email = uaaProfile.email;
    profile.userName = uaaProfile.user_name;
    profile.givenName = uaaProfile.given_name;
    profile.familyName = uaaProfile.family_name;
    profile.name = uaaProfile.name;
    profile.userId = uaaProfile.user_id;

    return profile;
  }

  public storeProviderCount(count: Number) {
    this.sessionStorageService.store(this.PROVIDER_COUNT_KEY, count);
  }

  public getProviderCount() {
    return this.sessionStorageService.retrieve(this.PROVIDER_COUNT_KEY);
  }

  public deleteProviderCount() {
    this.sessionStorageService.clear(this.PROVIDER_COUNT_KEY);
  }

  getMasterUiLoginUrl(): string{
    return this.sessionStorageService.retrieve(this.MASTER_UI_LOGIN);
  }

  deleteMasterUiLoginUrl(){
    this.sessionStorageService.clear(this.MASTER_UI_LOGIN);
  }
}
