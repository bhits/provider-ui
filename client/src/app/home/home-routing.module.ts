import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {ConfigResolveService} from "../consent/shared/config-resolve.service";

const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    resolve: {
      providerPermissions: ConfigResolveService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
