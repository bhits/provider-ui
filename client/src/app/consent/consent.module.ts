import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgUploaderModule} from "ngx-uploader";

import {ConsentRoutingModule, routedConsentComponents} from "./consent-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ConsentSearchComponent} from "./consent-search/consent-search.component";
import {ConsentService} from "./shared/consent.service";
import {ConsentListComponent} from "./consent-list/consent-list.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgUploaderModule,
    ConsentRoutingModule
  ],
  declarations: [
    routedConsentComponents,
    ConsentListComponent,
    ConsentSearchComponent
  ],
  exports: [ConsentListComponent],
  providers: [ConsentService]
})
export class ConsentModule {
}
