import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {routedComponents, routedResolveServices, UserRoutingModule} from "./user-routing.module";
import {SharedModule} from "app/shared/shared.module";
import {UserService} from "./shared/user.service";
import {UserVerificationComponent} from "./user-verification/user-verification.component";
import {UserPipe} from "./shared/user.pipe";
import {UserCreationLookupService} from "./shared/user-creation-lookup.service";
import {ConsentModule} from "../consent/consent.module";

@NgModule({
  imports: [
    CommonModule,
    ConsentModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    routedComponents,
    UserVerificationComponent,
    UserPipe
  ],
  providers: [
    routedResolveServices,
    UserCreationLookupService,
    UserService
  ]
})
export class UserModule {
}
