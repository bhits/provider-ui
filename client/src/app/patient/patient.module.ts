import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgUploaderModule} from "ngx-uploader";
import {PatientVerificationComponent} from "./patient-verification/patient-verification.component";
import {SharedModule} from "../shared/shared.module";
import {PatientService} from "./shared/patient.service";
import {PatientCreationLookupService} from "./shared/patient-creation-lookup.service";
import {PatientRoutingModule, routedComponents, routedResolveServices} from "./patient-routing.module";
import {ProviderModule} from "../provider/provider.module";
import {ConsentModule} from "app/consent/consent.module";
import {SegmentPatientHealthRecordComponent} from "./segment-patient-health-record/segment-patient-health-record.component";
import {SegmentDocumentComponent} from "./segment-document/segment-document.component";


@NgModule({
  imports: [
    CommonModule,
    ConsentModule,
    PatientRoutingModule,
    ProviderModule,
    NgUploaderModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    PatientVerificationComponent,
    SegmentPatientHealthRecordComponent,
    SegmentDocumentComponent
  ],
  providers: [
    routedResolveServices,
    PatientCreationLookupService,
    PatientService
  ]
})
export class PatientModule {
}
