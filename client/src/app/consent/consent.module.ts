import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgUploaderModule} from "ngx-uploader";

import {ConsentRoutingModule, routedConsentComponents} from "./consent-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ConsentSearchComponent} from "./consent-search/consent-search.component";
import {ConsentService} from "./shared/consent.service";
import {SensitivityCategoryPipe} from "./shared/sensitivity-category.pipe";
import {SharePurposePipe} from "./shared/share-purpose.pipe";
import {ConsentStagePipe} from "./shared/consent-stage.pipe";
import {ConsentCardComponent} from "./consent-card/consent-card.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";
import {SelectProvidersComponent} from "./select-providers/select-providers.component";
import { SelectProviderComponent } from './select-provider/select-provider.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgUploaderModule,
    ConsentRoutingModule
  ],
  declarations: [
    routedConsentComponents,
    ConsentCardComponent,
    ConsentCardListComponent,
    ConsentSearchComponent,
    SensitivityCategoryPipe,
    SharePurposePipe,
    ConsentStagePipe,
    SelectProvidersComponent,
    SelectProviderComponent
  ],
  exports: [ConsentCardListComponent],
  providers: [ConsentService]
})
export class ConsentModule {
}
