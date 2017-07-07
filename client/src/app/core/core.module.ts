import {NgModule} from "@angular/core";
import {SecurityModule} from "../security/security.module";
import {SlimLoadingBarModule, SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Http, RequestOptions, XHRBackend} from "@angular/http";
import {httpInterceptorServiceFactory} from "./http-interceptor.service";
import {TokenService} from "../security/shared/token.service";
import {GlobalEventManagementService} from "./global-event-management.service";
import {CustomTranslateService} from "./custom-translate.service";
import {SessionStorageService} from "../security/shared/session-storage.service";
import {ConfigService} from "./config.service";

@NgModule({
  imports: [
    SecurityModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [],
  providers: [
    ConfigService,
    GlobalEventManagementService,
    CustomTranslateService,
    {
      provide: Http,
      useFactory: httpInterceptorServiceFactory,
      deps: [XHRBackend, RequestOptions, SlimLoadingBarService, TokenService, SessionStorageService]
    }
  ],
  exports: [SlimLoadingBarModule]
})
export class CoreModule {
}
