import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PatientsComponent} from "app/patient/patients/patients.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {PatientCreateEditComponent} from "app/patient/patient-create-edit/patient-create-edit.component";
import {PatientResolveService} from "app/patient/shared/patient-resolve.service";
import {CanDeactivateGuardService} from "../security/shared/can-deactivate-guard.service";
import {PatientListComponent} from "./patient-list/patient-list.component";
import {PatientCreationLookupResolveService} from "./shared/patient-creation-lookup-resolve.service";
import {SampleDocumentResolveService} from "app/consent/shared/sample-document-resolve.service";

const patientRoutes: Routes = [
  {
    path: 'patients',
    component: PatientsComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
        component: PatientListComponent
      },
      {
        path: 'create',
        component: PatientCreateEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          patientCreationLookupInfo: PatientCreationLookupResolveService
        }
      },
      {
        path: ':patientId',
        component: PatientCreateEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          patient: PatientResolveService,
          patientCreationLookupInfo: PatientCreationLookupResolveService,
          sampleDocuments: SampleDocumentResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(patientRoutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}

export const routedComponents = [
  PatientsComponent,
  PatientListComponent,
  PatientCreateEditComponent
];

export const routedResolveServices = [
  PatientResolveService,
  PatientCreationLookupResolveService,
  SampleDocumentResolveService
];
