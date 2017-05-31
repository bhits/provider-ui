import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConsentModule} from "app/consent/consent.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,

    // Third Party Modules

    // Provider UI Modules
    ConsentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
