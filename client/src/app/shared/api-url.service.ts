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
      ["configBaseUrl", "/provider-ui-api/config"],
      ["plsBaseUrl", "/provider-ui-api/pls"],
      ["pcmBaseUrl", "/provider-ui-api/pcm"],
      ["pepBaseUrl", "/provider-ui-api/pep"],
      ["tryPolicyBaseUrl", "/provider-ui-api/try-policy"],
      ["umsBaseUrl", "/provider-ui-api/ums"],
      ["vssBaseUrl", "/provider-ui-api/vss"],
      ["uaaBaseUrl", "/provider-ui-api/uaa"]
    ]
  );

  constructor() {
  }

  public getLoginUrl(): string {
    return this.urls.get('loginUrl');
  }

  public getHomeUrl(): string {
    return this.urls.get('homeUrl');
  }

  public getPatientListUrl(): string {
    return this.urls.get('patientListUrl');
  }

  public getPatientSearchUrl(): string {
    return this.urls.get('patientSearchUrl');
  }

  public getPatientProvidersSearchUrl(): string {
    return this.urls.get('patientProvidersSearchUrl');
  }

  public getPatientConsentsCreateUrl(): string {
    return this.urls.get('patientConsentsCreateUrl');
  }

  public getConfigBaseUrl(): string {
    return this.urls.get("configBaseUrl");
  }

  public getPcmBaseUrl(): string {
    return this.urls.get("pcmBaseUrl");
  }

  public getPepUrl(): string {
    return this.urls.get('pepBaseUrl');
  }

  public getPlsBaseUrl(): string {
    return this.urls.get("plsBaseUrl");
  }

  public getTryPolicyBaseUrl(): string {
    return this.urls.get("tryPolicyBaseUrl");
  }

  public getUmsBaseUrl(): string {
    return this.urls.get('umsBaseUrl');
  }

  public getVssBaseUrl(): string {
    return this.urls.get('vssBaseUrl');
  }

  public getUaaBaseUrl(): string {
    return this.urls.get('uaaBaseUrl');
  }
}
