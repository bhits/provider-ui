import "hammerjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "app/core/core.module";
import {HomeModule} from "./home/home.module";
import {LayoutModule} from "./layout/layout.module";
import {UserModule} from "app/user/user.module";
import {AppRoutingModule} from "app/app-routing.module";
import {ConsentModule} from "./consent/consent.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserAnimationsModule,
    BrowserModule,

    // Third Party Modules

    // Staff UI Modules
    CoreModule,
    HomeModule,
    LayoutModule,
    UserModule,
    ConsentModule,
    AppRoutingModule // Order matters, this must in the end
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
