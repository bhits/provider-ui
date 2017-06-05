import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { NgUploaderModule } from 'ngx-uploader';

import {ConsentRoutingModule, consentRoutedComponents} from "./consent-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ConsentService} from "./shared/consent.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgUploaderModule,
    ConsentRoutingModule
  ],
  declarations: [consentRoutedComponents],
  providers: [ConsentService]
})
export class ConsentModule {
}
