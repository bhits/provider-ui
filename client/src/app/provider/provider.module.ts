import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ProviderRoutingModule} from "./provider-routing.module";
import {ProviderListComponent} from "./provider-list/provider-list.component";

@NgModule({
  imports: [
    CommonModule,
    ProviderRoutingModule
  ],
  declarations: [ProviderListComponent],
  exports: [ProviderListComponent]
})
export class ProviderModule {
}
