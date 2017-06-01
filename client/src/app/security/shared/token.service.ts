import {Injectable} from "@angular/core";
import {SessionStorageService} from "./session-storage.service";
import {AuthorizationResponse} from "./authorization-response.model";

@Injectable()
export class TokenService {
  private OAUTH_TOKEN_KEY: string = 'c2s-oauth-token';
  private USER_INFO_KEY: string = 'c2s-userinfo-token';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  public getOauthToken(): AuthorizationResponse {
    return this.sessionStorageService.retrieve(this.OAUTH_TOKEN_KEY);
  }

  public setOauthToken(authorizationResponse: AuthorizationResponse): void {
    this.sessionStorageService.store(this.OAUTH_TOKEN_KEY, authorizationResponse);
  }

  public deleteOauthToken(): void {
    this.sessionStorageService.clear(this.OAUTH_TOKEN_KEY);
  }

  public hasScope(scope: string): boolean {
    if (this.getOauthToken()) {
      const uaaToken: AuthorizationResponse = this.getOauthToken();
      return uaaToken.scope.includes(scope);
    }
    return false;
  }
}
