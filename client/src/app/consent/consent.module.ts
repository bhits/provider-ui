import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ConsentRoutingModule} from "./consent-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConsentRoutingModule
  ],
  declarations: []
})
export class ConsentModule {
}
