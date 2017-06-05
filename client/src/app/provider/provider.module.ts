import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ProviderRoutingModule, routedComponents} from "./provider-routing.module";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {SharedModule} from "app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule
  ],
  declarations: [routedComponents, ProviderListComponent],
  exports: [ProviderListComponent]
})
export class ProviderModule {
}
