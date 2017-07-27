import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

import {SessionStorageService} from "./session-storage.service";
import {ApiUrlService} from "../../shared/api-url.service";
import {UmsProfile} from "./ums-profile.model";

@Injectable()
export class ProfileService {
  umsProfileUrl: string = this.apiUrlService.getUmsBaseUrl() + "/providers/profile";
  private UMS_PROFILE_KEY: string = 'c2s-ums-profile';

  constructor(private http: Http,
              private apiUrlService: ApiUrlService,
              private sessionStorageService: SessionStorageService) {
  }

  public getUMSProfile(): Observable<UmsProfile> {
    return this.http.get(this.umsProfileUrl)
      .map((resp: Response) => <any>(resp.json()));
  }

  public setProfileInSessionStorage(profile: UmsProfile) {
    this.sessionStorageService.store(this.UMS_PROFILE_KEY, profile);
  }

  public getProfileFromSessionStorage(): UmsProfile {
    return this.sessionStorageService.retrieve(this.UMS_PROFILE_KEY);
  }

  public getFullName(): string {
    let umsProfile: UmsProfile = this.getProfileFromSessionStorage();
    if (umsProfile) {
      return umsProfile.firstName + " " + umsProfile.lastName;
    } else {
      return "";
    }
  }

  //Todo: Change it when current user can manage multiple patients
  public getUserMrn(): string {
    let umsProfile: UmsProfile = this.sessionStorageService.retrieve(this.UMS_PROFILE_KEY);
    if (umsProfile != null) {
      return umsProfile.mrn;
    }
  }

  public getMRN() {
    let umsProfile: UmsProfile = this.getProfileFromSessionStorage();
    if (umsProfile) {
      return umsProfile.mrn;
    } else {
      return "";
    }
  }

  public getUserLocale() {
    let umsProfile: UmsProfile = this.getProfileFromSessionStorage();
    if (umsProfile) {
      return umsProfile.userLocale;
    } else {
      return "";
    }
  }
}
