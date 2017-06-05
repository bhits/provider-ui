import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ConsentRoutingModule, routedComponents} from "./consent-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ConsentListComponent} from "./consent-list/consent-list.component";
import { ConsentSearchComponent } from './consent-search/consent-search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConsentRoutingModule
  ],
  declarations: [routedComponents, ConsentSearchComponent],
  exports: [ConsentListComponent]
})
export class ConsentModule {
}
