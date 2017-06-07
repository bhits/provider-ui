import {Injectable} from "@angular/core";

@Injectable()
export class ApiUrlService {
  private urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["homeUrl", "/home"],
      ["patientListUrl", "/patients"],
      ["patientProvidersSearchUrl", "/providers/search"],

      // External api Url maps
      ["PlsBaseUrl", "/provider-ui-api/pls"],
      ["PcmBaseUrl", "/provider-ui-api/pcm"],
      ["UmsBaseUrl", "/provider-ui-api/ums"],
      ["uaaTokenUrl", "/uaa/oauth/token"],
      ["uaaUserInfoUrl", "/uaa/userinfo"],
      ["pepBaseUrl", "/provider-ui-api/pep"]
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

  getPatientListUrl(): string {
    return this.urls.get('patientListUrl');
  }

  getPatientProvidersSearchUrl(): string {
    return this.urls.get('patientProvidersSearchUrl');
  }

  getPcmBaseUrl(): string {
    return this.urls.get("PcmBaseUrl");
  }

  getPlsBaseUrl(): string {
    return this.urls.get("PlsBaseUrl");
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
}
