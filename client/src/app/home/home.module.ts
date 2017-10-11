import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import {PatientListCardComponent} from "./patient-list-card/patient-list-card.component";
import { PatientSearchCardComponent } from './patient-search-card/patient-search-card.component';
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FormsModule,
  ],
  declarations: [
    HomeComponent,
    PatientListCardComponent,
    PatientSearchCardComponent
  ]
})
export class HomeModule {
}
