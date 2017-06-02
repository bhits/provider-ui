import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {SegmentationComponent} from "./segmentation/segmentation.component";
import {ConsentListComponent} from "./consent-list/consent-list.component";
import {ConsentsComponent} from "./consents/consents.component";

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



export const consentsRoutedComponents = [
  ConsentsComponent,
  ConsentListComponent,
  SegmentationComponent
];


