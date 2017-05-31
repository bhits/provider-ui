import "hammerjs";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    FlexLayoutModule,
    MaterialModule,
  ]
})
export class SharedModule {
}
