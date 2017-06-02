import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConsentsComponent} from "app/consent/consents/consents.component";
import {CanActivateAuthGuardService} from "app/security/shared/can-activate-auth-guard.service";
import {ConsentListComponent} from "app/consent/consent-list/consent-list.component";

const consentRoutes: Routes = [
  {
    path: 'consents',
    component: ConsentsComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
        component: ConsentListComponent
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

export const routedComponents = [
  ConsentsComponent,
  ConsentListComponent
];
