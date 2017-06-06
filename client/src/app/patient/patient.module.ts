import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientsComponent} from './patients/patients.component';
import {PatientVerificationComponent} from './patient-verification/patient-verification.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {PatientCreateEditComponent} from './patient-create-edit/patient-create-edit.component';
import {SharedModule} from "../shared/shared.module";
import {PatientPipe} from "./shared/patient.pipe";
import {PatientService} from "./shared/patient.service";
import {PatientCreationLookupService} from "./shared/patient-creation-lookup.service";
import {routedComponents, routedResolveServices, PatientRoutingModule} from "./patient-routing.module";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule
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
