import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
  ProviderRoutingModule,
  routedProviderComponents,
  routedProviderResolveServices
} from "./provider-routing.module";
import {SharedModule} from "app/shared/shared.module";
import {ProviderService} from "./shared/provider.service";
import {ProviderSearchResultComponent} from "./provider-search-result/provider-search-result.component";
import {FlattenedSmallProviderPipe} from "./shared/flattened-small-provider.pipe";
import {ProviderMultiAddComponent} from "./provider-multi-add/provider-multi-add.component";
import {ProviderCardListComponent} from "./provider-card-list/provider-card-list.component";
import {ProviderCardComponent} from "./provider-card/provider-card.component";

@NgModule({
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule
  ],
  declarations: [
    routedProviderComponents,
    ProviderCardComponent,
    ProviderCardListComponent,
    ProviderMultiAddComponent,
    ProviderSearchResultComponent,
    FlattenedSmallProviderPipe
  ],
  providers: [
    routedProviderResolveServices,
    ProviderService
  ],
  exports: [ProviderCardListComponent]
})
export class ProviderModule {
}
