import { Component, OnInit } from '@angular/core';
import {CustomTranslateService} from "../../core/custom-translate.service";

@Component({
  selector: 'c2s-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.scss']
})
export class MultiLanguageComponent implements OnInit {

  constructor(private customTranslateService: CustomTranslateService) { }

  ngOnInit() {
  }

  setLocale(locale:string){
    this.customTranslateService.setDefaultLanguage(locale);
    this.customTranslateService.updateDefaultLanguage(locale);
  }

  getSupportedLanguage():string[]{
    return this.customTranslateService.getSupportedLanguages();
  }

  getCurrentLanguage(){
    return this.customTranslateService.getCurrentLanguage();
  }
}
