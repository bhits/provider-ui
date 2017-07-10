import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {AuthorizationService} from "app/security/shared/authorization.service";
import {UtilityService} from "app/shared/utility.service";
import {ApiUrlService} from "../../shared/api-url.service";
import {NotificationService} from "app/shared/notification.service";
import {TokenService} from "app/security/shared/token.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild {

  constructor(private apiUrlService: ApiUrlService,
              private authorizationService: AuthorizationService,
              private notificationService: NotificationService,
              private tokenService: TokenService,
              private utilityService: UtilityService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authorizationService.canAccess()) {
      if (state.url.includes(this.apiUrlService.getPatientConsentsCreateUrl())) {
        this.assertHasEnoughProviders();
      }
      return true;
    } else {
      this.utilityService.navigateTo(this.apiUrlService.getLoginUrl());
      return false;
    }
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }

  private assertHasEnoughProviders(): void {
    let providerCount: number = this.tokenService.getProviderCount();
    if (providerCount <= 1) {
      this.notificationService.i18nShow("SECURITY.NOTIFICATION_MSG.NO_ENOUGH_PROVIDERS");
      this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl());
    }
  }
}
