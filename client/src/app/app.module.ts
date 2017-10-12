import "hammerjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {Http} from "@angular/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "app/core/core.module";
import {HomeModule} from "./home/home.module";
import {LayoutModule} from "./layout/layout.module";
import {PatientModule} from "app/patient/patient.module";
import {AppRoutingModule} from "app/app-routing.module";
import {ConsentModule} from "app/consent/consent.module";
import {ProviderModule} from "./provider/provider.module";
import {createTranslateLoader, CustomTranslateService} from "./core/custom-translate.service";
import {HistoryModule} from "./history/history.module";
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,

    // Third Party Modules
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    // Provider UI Modules
    CoreModule,
    ConsentModule,
    HomeModule,
    LayoutModule,
    PatientModule,
    ProviderModule,
    HistoryModule,
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
