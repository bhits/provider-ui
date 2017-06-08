import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
  ProviderRoutingModule,
  routedProviderComponents,
  routedProviderResolveServices
} from "./provider-routing.module";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {SharedModule} from "app/shared/shared.module";
import {ProviderService} from "./shared/provider.service";
import {ProviderSearchResultComponent} from "./provider-search-result/provider-search-result.component";
import {FlattenedSmallProviderPipe} from "./shared/flattened-small-provider.pipe";
import {ProviderMultiAddComponent} from "./provider-multi-add/provider-multi-add.component";

@NgModule({
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule
  ],
  declarations: [
    routedProviderComponents,
    ProviderListComponent,
    ProviderMultiAddComponent,
    ProviderSearchResultComponent,
    FlattenedSmallProviderPipe
  ],
  providers: [
    routedProviderResolveServices,
    ProviderService
  ],
  exports: [ProviderListComponent]
})
export class ProviderModule {
}
