import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {ProfileService} from "../security/shared/profile.service";
import {UmsProfile} from "../security/shared/ums-profile.model";
import {Http} from "@angular/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


@Injectable()
export class CustomTranslateService {

  constructor( private translateService: TranslateService,
               private profileService: ProfileService) {
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

  updateDefaultLanguage(locale:string){
    this.translateService.use(locale);
    // TODO Should update backend with selected locale
    this.updateProfileLocale(locale);
  }

  private updateProfileLocale(locale:string){
    let profile: UmsProfile = this.profileService.getProfileFromSessionStorage();
    if(profile){
      profile.userLocale = locale;
      this.profileService.setProfileInSessionStorage(profile);
    }
  }

  getSupportedLanguages(): any[]{
    return this.profileService.getProfileFromSessionStorage().supportedLocales;
  }
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
