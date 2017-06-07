import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {Http} from "@angular/http";
import {ApiUrlService} from "../shared/api-url.service";
import {ExceptionService} from "../shared/exception.service";


@Injectable()
export class CustomTranslateService {
  private umsProfileUrl: string = this.apiUrlService.getUmsBaseUrl().concat("/users/locale");

  constructor( private translateService: TranslateService,
               // private profileService: ProfileService,
               private http: Http,
               private apiUrlService: ApiUrlService,
               private exceptionService: ExceptionService,) {
  }

  getCurrentLanguage():string{
     return this.translateService.currentLang;
  }

  addSupportedLanguages(locales: string[]){
    this.translateService.addLangs(locales);
  }

  setDefaultLanguage(locale:string){
    this.updateProfileLocale(locale);
    this.translateService.use(locale);
  }

  updateDefaultLanguage(){
    // Will dynamically set the selected locale in the headers
    this.http.put(this.umsProfileUrl, {})
      .map(() => null)
      .subscribe(
        (response) =>{
        },
        (error) => {
          this.exceptionService.handleError
        }
      );
  }

  private updateProfileLocale(locale:string){
    // let profile: UmsProfile = this.profileService.getProfileFromSessionStorage();
    // if(profile){
    //   profile.userLocale = locale;
    //   this.profileService.setProfileInSessionStorage(profile);
    // }
  }

  getSupportedLanguages(): any[]{
    return null;
    // return this.profileService.getProfileFromSessionStorage().supportedLocales;
  }
}
