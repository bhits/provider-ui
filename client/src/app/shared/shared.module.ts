import {NgModule} from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {UsPhoneNumberPipe} from "./us-phone-number.pipe";
import {ControlValidationErrorMessageComponent} from "app/shared/control-validation-error-message/control-validation-error-message.component";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ShowHidePasswordComponent} from "./show-hide-password/show-hide-password.component";
import {ApiUrlService} from "app/shared/api-url.service";
import {ConfirmDialogService} from "./confirm-dialog.service";
import {ExceptionService} from "./exception.service";
import {NotificationService} from "./notification.service";
import {UtilityService} from "./utility.service";
import {ValidationService} from "./validation.service";
import {Md2Module} from "md2";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2PaginationModule} from "ng2-pagination";
import {ProviderPipe} from "./provider.pipe";
import {BrowserService} from "app/shared/browser.service";
import {PatientPipe} from "./patient.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {FlattenedSmallProviderPipe} from "./flattened-small-provider.pipe";
import { SocialSecurityMaskDirective } from './social-security-mask.directive';
import { SocialSecurityPipe } from './social-security.pipe';
import {MaterialModule} from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    UsPhoneNumberPipe,
    ControlValidationErrorMessageComponent,
    ConfirmDialogComponent,
    ShowHidePasswordComponent,
    ProviderPipe,
    PatientPipe,
    FlattenedSmallProviderPipe,
    SocialSecurityMaskDirective,
    SocialSecurityPipe
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    ApiUrlService,
    BrowserService,
    ConfirmDialogService,
    ExceptionService,
    NotificationService,
    UtilityService,
    ValidationService,
    DatePipe,
    SocialSecurityPipe
  ],
  exports: [
    ControlValidationErrorMessageComponent,
    FlexLayoutModule,
    MaterialModule,
    Md2Module,
    RouterModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    ShowHidePasswordComponent,
    ProviderPipe,
    PatientPipe,
    TranslateModule,
    FlattenedSmallProviderPipe,
    UsPhoneNumberPipe,
    SocialSecurityMaskDirective,
    SocialSecurityPipe
  ]
})
export class SharedModule {
}
