import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConsentsComponent} from "app/consent/consents/consents.component";
import {CanActivateAuthGuardService} from "app/security/shared/can-activate-auth-guard.service";
import {ConsentCreateEditComponent} from "app/consent/consent-create-edit/consent-create-edit.component";
import {PatientResolveService} from "app/patient/shared/patient-resolve.service";
import {ConsentResolveService} from "app/consent/shared/consent-resolve.service";

const consentRoutes: Routes = [
  {
    path: 'patients/:patientId/consents',
    component: ConsentsComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    resolve: {
      patient: PatientResolveService
    },
    children: [
      {
        path: 'create',
        component: ConsentCreateEditComponent
      },
      {
        path: ':consentId',
        component: ConsentCreateEditComponent,
        resolve: {
          consent: ConsentResolveService
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(consentRoutes)],
  exports: [RouterModule]
})
export class ConsentRoutingModule {
}

export const routedConsentComponents = [
  ConsentsComponent,
  ConsentCreateEditComponent
];

export const routedConsentResolveServices = [
  ConsentResolveService
];
