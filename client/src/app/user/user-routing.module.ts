import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "app/user/users/users.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {UserCreateEditComponent} from "app/user/user-create-edit/user-create-edit.component";
import {UserResolveService} from "app/user/shared/user-resolve.service";
import {CanDeactivateGuardService} from "../security/shared/can-deactivate-guard.service";
import {UserListComponent} from "./user-list/user-list.component";
import {UserCreationLookupResolveService} from "./shared/user-creation-lookup-resolve.service";

const userRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'create',
        component: UserCreateEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          userCreationLookupInfo: UserCreationLookupResolveService
        }
      },
      {
        path: 'edit/:userId',
        component: UserCreateEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          user: UserResolveService,
          userCreationLookupInfo: UserCreationLookupResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

export const routedComponents = [
  UsersComponent,
  UserListComponent,
  UserCreateEditComponent
];

export const routedResolveServices = [
  UserResolveService,
  UserCreationLookupResolveService
];
