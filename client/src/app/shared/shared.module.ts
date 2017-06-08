import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
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

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    UsPhoneNumberPipe,
    ControlValidationErrorMessageComponent,
    ConfirmDialogComponent,
    ShowHidePasswordComponent,
    ProviderPipe
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    ApiUrlService,
    BrowserService,
    ConfirmDialogService,
    ExceptionService,
    NotificationService,
    UtilityService,
    ValidationService
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
    UsPhoneNumberPipe
  ]
})
export class SharedModule {
}
