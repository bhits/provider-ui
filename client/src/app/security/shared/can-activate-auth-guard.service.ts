import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {AuthorizationService} from "app/security/shared/authorization.service";
import {UtilityService} from "app/shared/utility.service";
import {ApiUrlService} from "../../shared/api-url.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild {

  constructor(private apiUrlService: ApiUrlService,
              private authorizationService: AuthorizationService,
              private utilityService: UtilityService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authorizationService.canAccess()) {
      return true;
    } else {
      this.utilityService.navigateTo(this.apiUrlService.getLoginUrl());
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }
}
