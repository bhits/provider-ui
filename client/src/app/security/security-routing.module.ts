import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "app/security/page-not-found/page-not-found.component";

const securityRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(securityRoutes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}

export const routedComponents = [LoginComponent, PageNotFoundComponent];
