import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProvidersComponent} from "./providers/providers.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {PatientCreationLookupResolveService} from "../patient/shared/patient-creation-lookup-resolve.service";
import {PatientResolveService} from "app/patient/shared/patient-resolve.service";

const providerRoutes: Routes = [
  {
    path: 'providers',
    component: ProvidersComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: 'search/:patientId',
        component: ProviderSearchComponent,
        resolve: {
          patientCreationLookupInfo: PatientCreationLookupResolveService,
          patient: PatientResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(providerRoutes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule {
}

export const routedComponents = [
  ProvidersComponent,
  ProviderSearchComponent
];
