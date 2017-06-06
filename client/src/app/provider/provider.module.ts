import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ProviderRoutingModule, routedComponents} from "./provider-routing.module";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {SharedModule} from "app/shared/shared.module";
import {ProviderService} from "./shared/provider.service";

@NgModule({
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule
  ],
  declarations: [routedComponents, ProviderListComponent],
  providers: [
    ProviderService
  ],
  exports: [ProviderListComponent]
})
export class ProviderModule {
}
