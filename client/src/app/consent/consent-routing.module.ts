import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConsentsComponent} from "app/consent/consents/consents.component";
import {CanActivateAuthGuardService} from "app/security/shared/can-activate-auth-guard.service";
import {ConsentListComponent} from "app/consent/consent-list/consent-list.component";
import {SegmentationComponent} from "./segmentation/segmentation.component";

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
      },
      {
        path: 'segment-document',
        component: SegmentationComponent,
        canActivate: [CanActivateAuthGuardService]
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

export const consentRoutedComponents = [
  ConsentsComponent,
  ConsentListComponent,
  SegmentationComponent
];
