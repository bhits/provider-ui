import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgUploaderModule} from "ngx-uploader";

import {consentRoutedComponents, ConsentRoutingModule} from "./consent-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ConsentListComponent} from "./consent-list/consent-list.component";
import {ConsentSearchComponent} from "./consent-search/consent-search.component";
import {ConsentService} from "./shared/consent.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgUploaderModule,
    ConsentRoutingModule
  ],
  declarations: [consentRoutedComponents, ConsentSearchComponent],
  exports: [ConsentListComponent],
  providers: [ConsentService]
})
export class ConsentModule {
}
