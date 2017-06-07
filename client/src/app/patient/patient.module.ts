import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PatientVerificationComponent} from "./patient-verification/patient-verification.component";
import {SharedModule} from "../shared/shared.module";
import {PatientPipe} from "./shared/patient.pipe";
import {PatientService} from "./shared/patient.service";
import {PatientCreationLookupService} from "./shared/patient-creation-lookup.service";
import {PatientRoutingModule, routedComponents, routedResolveServices} from "./patient-routing.module";
import {ProviderModule} from "../provider/provider.module";
import {ConsentModule} from "app/consent/consent.module";


@NgModule({
  imports: [
    CommonModule,
    ConsentModule,
    PatientRoutingModule,
    ProviderModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    PatientVerificationComponent,
    PatientPipe
  ],
  providers: [
    routedResolveServices,
    PatientCreationLookupService,
    PatientService
  ]
})
export class PatientModule {
}
