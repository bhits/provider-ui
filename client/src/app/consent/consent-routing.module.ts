import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConsentsComponent} from "app/consent/consents/consents.component";
import {CanActivateAuthGuardService} from "app/security/shared/can-activate-auth-guard.service";
import {ConsentCreateEditComponent} from "app/consent/consent-create-edit/consent-create-edit.component";
import {PatientResolveService} from "app/patient/shared/patient-resolve.service";
import {ConsentResolveService} from "app/consent/shared/consent-resolve.service";
import {ProvidersResolveService} from "app/provider/shared/providers-resolve.service";
import {PurposeOfUsesResolveService} from "./shared/purpose-of-uses-resolve.service";
import {SensitivityCategoriesResolveService} from "app/consent/shared/sensitivity-categories-resolve.service";
import {ConsentSignComponent} from "./consent-sign/consent-sign.component";
import {ConsentRevokeComponent} from "./consent-revoke/consent-revoke.component";
import {ConsentTermsResolveService} from "./shared/consent-terms-resolve.service";
import {ConsentRevocationTermsResolveService} from "./shared/consent-revocation-terms-resolve.service";

const consentRoutes: Routes = [
  {
    path: 'patients/:patientId/consents',
    component: ConsentsComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    resolve: {
      patient: PatientResolveService,
      purposeOfUses: PurposeOfUsesResolveService,
      sensitivityCategories: SensitivityCategoriesResolveService
    },
    children: [
      {
        path: 'create',
        component: ConsentCreateEditComponent,
        resolve: {
          providers: ProvidersResolveService
        },
      },
      {
        path: ':consentId',
        component: ConsentCreateEditComponent,
        resolve: {
          consent: ConsentResolveService,
          providers: ProvidersResolveService
        },
      },
      {
        path: ':consentId/consent-sign',
        component: ConsentSignComponent,
        resolve: {
          consent: ConsentResolveService,
          consentTerms: ConsentTermsResolveService
        }
      },
      {
        path: ':consentId/consent-revoke',
        component: ConsentRevokeComponent,
        resolve: {
          consent: ConsentResolveService,
          consentRevocationTerms: ConsentRevocationTermsResolveService
        }
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
  ConsentResolveService,
  ConsentTermsResolveService,
  ConsentRevocationTermsResolveService,
  PurposeOfUsesResolveService,
  SensitivityCategoriesResolveService
];
