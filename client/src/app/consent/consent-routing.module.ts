import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConsentsComponent} from "app/consent/consents/consents.component";
import {CanActivateAuthGuardService} from "app/security/shared/can-activate-auth-guard.service";
import {ConsentCreateEditComponent} from "app/consent/consent-create-edit/consent-create-edit.component";

const consentRoutes: Routes = [
  {
    path: 'patients/:patientId/consents',
    component: ConsentsComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: 'create',
        component: ConsentCreateEditComponent
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