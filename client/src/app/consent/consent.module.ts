import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgUploaderModule} from "ngx-uploader";

import {ConsentRoutingModule, routedConsentComponents, routedConsentResolveServices} from "./consent-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ConsentSearchComponent} from "./consent-search/consent-search.component";
import {ConsentService} from "./shared/consent.service";
import {SensitivityCategoryPipe} from "./shared/sensitivity-category.pipe";
import {SharePurposePipe} from "./shared/share-purpose.pipe";
import {ConsentStagePipe} from "./shared/consent-stage.pipe";
import {ConsentCardComponent} from "./consent-card/consent-card.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";
import {SelectProvidersComponent} from "./select-providers/select-providers.component";
import {SelectProviderComponent} from "./select-provider/select-provider.component";
import {ConsentTermsComponent} from "./consent-terms/consent-terms.component";
import {MedicalInformationComponent} from "./medical-information/medical-information.component";
import {PurposeOfUseComponent} from "./purpose-of-use/purpose-of-use.component";
import {FormsModule} from "@angular/forms";
import {PurposeOfUseService} from "app/consent/shared/purpose-of-use.service";
import {MedicalInformationService} from "./shared/medical-information.service";
import { ConsentRevokeComponent } from './consent-revoke/consent-revoke.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgUploaderModule,
    ConsentRoutingModule
  ],
  declarations: [
    routedConsentComponents,
    ConsentCardComponent,
    ConsentCardListComponent,
    ConsentSearchComponent,
    SensitivityCategoryPipe,
    SharePurposePipe,
    ConsentStagePipe,
    SelectProvidersComponent,
    SelectProviderComponent,
    ConsentTermsComponent,
    MedicalInformationComponent,
    PurposeOfUseComponent,
    ConsentRevokeComponent
  ],
  exports: [ConsentCardListComponent],
  providers: [
    ConsentService,
    PurposeOfUseService,
    MedicalInformationService,
    routedConsentResolveServices]
})
export class ConsentModule {
}
