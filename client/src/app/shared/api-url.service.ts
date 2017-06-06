import {Injectable} from "@angular/core";

@Injectable()
export class ApiUrlService {
  private urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["homeUrl", "/home"],
      ["userListUrl", "/users"],

      // External api Url maps
      ["UmsBaseUrl", "/provider-ui-api/ums"],
      ["uaaTokenUrl", "/uaa/oauth/token"],
      ["uaaUserInfoUrl", "/uaa/userinfo"],
      ["pepBaseUrl", "/provider-ui-api/pep"],
      ["pcmBaseUrl", "/provider-ui-api/pcm"]
    ]
  );

  constructor() {
  }

  getLoginUrl(): string {
    return this.urls.get('loginUrl');
  }

  getHomeUrl(): string {
    return this.urls.get('homeUrl');
  }

  getUserListUrl(): string {
    return this.urls.get('userListUrl');
  }

  getUmsBaseUrl(): string {
    return this.urls.get('UmsBaseUrl');
  }

  getUaaTokenUrl(): string {
    return this.urls.get('uaaTokenUrl');
  }

  getUaaUserInfoUrl(): string {
    return this.urls.get('uaaUserInfoUrl');
  }

  getPepUrl(): string {
    return this.urls.get('pepBaseUrl');
  }

  getPcmBaseUrl(): string {
    return this.urls.get('pcmBaseUrl');
  }
}
