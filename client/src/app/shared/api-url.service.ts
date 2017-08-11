import {Injectable} from "@angular/core";

@Injectable()
export class ApiUrlService {
  private urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["homeUrl", "/home"],
      ["patientListUrl", "/patients"],
      ["patientSearchUrl", "/patients/search"],
      ["patientProvidersSearchUrl", "/providers/search"],
      ["patientConsentsCreateUrl", "/consents/create"],

      // External api Url maps
      ["ConfigBaseUrl", "/provider-ui-api/config"],
      ["PlsBaseUrl", "/provider-ui-api/pls"],
      ["PcmBaseUrl", "/provider-ui-api/pcm"],
      ["pepBaseUrl", "/provider-ui-api/pep"],
      ["tryPolicyBaseUrl", "/provider-ui-api/try-policy"],
      ["UmsBaseUrl", "/provider-ui-api/ums"],
      ["VssBaseUrl", "/provider-ui-api/vss"],
      ["uaaBaseUrl", "/provider-ui-api/uaa"],
      ["uaaUserInfoUrl", "/uaa/userinfo"]
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

  getPatientSearchUrl(): string {
    return this.urls.get('patientSearchUrl');
  }

  getPatientProvidersSearchUrl(): string {
    return this.urls.get('patientProvidersSearchUrl');
  }

  getPatientConsentsCreateUrl(): string {
    return this.urls.get('patientConsentsCreateUrl');
  }

  getConfigBaseUrl(): string {
    return this.urls.get("ConfigBaseUrl");
  }

  getPcmBaseUrl(): string {
    return this.urls.get("PcmBaseUrl");
  }

  getPepUrl(): string {
    return this.urls.get('pepBaseUrl');
  }

  getPlsBaseUrl(): string {
    return this.urls.get("PlsBaseUrl");
  }

  getTryPolicyBaseUrl(): string {
    return this.urls.get("tryPolicyBaseUrl");
  }

  getUmsBaseUrl(): string {
    return this.urls.get('UmsBaseUrl');
  }

  getVssBaseUrl(): string {
    return this.urls.get('VssBaseUrl');
  }

  getUaaBaseUrl(): string {
    return this.urls.get('uaaBaseUrl');
  }

  getUaaUserInfoUrl(): string {
    return this.urls.get('uaaUserInfoUrl');
  }
}
