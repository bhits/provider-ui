import "hammerjs";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
  ]
})
export class SharedModule {
}
