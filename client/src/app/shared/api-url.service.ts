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
      ["patientConsentsCreateUrl", "/consents/create"],

      // External api Url maps
      ["PlsBaseUrl", "/provider-ui-api/pls"],
      ["PcmBaseUrl", "/provider-ui-api/pcm"],
      ["UmsBaseUrl", "/provider-ui-api/ums"],
      ["VssBaseUrl", "/provider-ui-api/vss"],
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

  getPatientConsentsCreateUrl(): string {
    return this.urls.get('patientConsentsCreateUrl');
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

  getVssBaseUrl(): string {
    return this.urls.get('VssBaseUrl');
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
