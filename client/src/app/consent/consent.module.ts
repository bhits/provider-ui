import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ConsentRoutingModule, routedComponents} from "./consent-routing.module";
import {SharedModule} from "../shared/shared.module";
import { ConsentListComponent } from './consent-list/consent-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConsentRoutingModule
  ],
  declarations: [routedComponents, ConsentListComponent]
})
export class ConsentModule {
}
