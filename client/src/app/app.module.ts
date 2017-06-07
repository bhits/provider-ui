import "hammerjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Http} from "@angular/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "app/core/core.module";
import {HomeModule} from "./home/home.module";
import {LayoutModule} from "./layout/layout.module";
import {UserModule} from "app/user/user.module";
import {AppRoutingModule} from "app/app-routing.module";
import {ConsentModule} from "app/consent/consent.module";
import {CustomTranslateService} from "./core/custom-translate.service";



export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserAnimationsModule,
    BrowserModule,

    // Third Party Modules
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    // Staff UI Modules
    CoreModule,
    ConsentModule,
    HomeModule,
    LayoutModule,
    UserModule,
    AppRoutingModule // Order matters, this must in the end
  ],
  providers: [
    TranslateService,
    CustomTranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
