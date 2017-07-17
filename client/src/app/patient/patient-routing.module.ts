import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PatientsComponent} from "app/patient/patients/patients.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {PatientCreateEditComponent} from "app/patient/patient-create-edit/patient-create-edit.component";
import {PatientResolveService} from "app/patient/shared/patient-resolve.service";
import {CanDeactivateGuardService} from "../security/shared/can-deactivate-guard.service";
import {PatientListComponent} from "./patient-list/patient-list.component";
import {PatientCreationLookupResolveService} from "./shared/patient-creation-lookup-resolve.service";
import {ConfigResolveService} from "../consent/shared/config-resolve.service";
import {SampleDocumentResolveService} from "app/consent/shared/sample-document-resolve.service";
import {PatientSearchComponent} from "app/patient/patient-search/patient-search.component";
import {PatientSearchConfigResolveService} from "./shared/patient-search-config-resolve.service";
import {PatientSearchConfigService} from "./shared/patient-search-config.service";

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
        path: 'search',
        component: PatientSearchComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          patientCreationLookupInfo: PatientCreationLookupResolveService,
          patientSearchConfig: PatientSearchConfigResolveService,
          providerPermissions: ConfigResolveService
        }
      },
      {
        path: 'create',
        component: PatientCreateEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          patientCreationLookupInfo: PatientCreationLookupResolveService,
          providerPermissions: ConfigResolveService
        }
      },
      {
        path: ':patientId',
        component: PatientCreateEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          patient: PatientResolveService,
          providerPermissions: ConfigResolveService,
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
  PatientCreateEditComponent,
  PatientListComponent,
  PatientSearchComponent
];

export const routedResolveServices = [
  PatientResolveService,
  PatientCreationLookupResolveService,
  ConfigResolveService,
  SampleDocumentResolveService,
  PatientSearchConfigService,
  PatientSearchConfigResolveService
];
