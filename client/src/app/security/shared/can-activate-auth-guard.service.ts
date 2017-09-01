import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthorizationService} from "app/security/shared/authorization.service";
import {UtilityService} from "app/shared/utility.service";
import {ApiUrlService} from "../../shared/api-url.service";
import {NotificationService} from "app/shared/notification.service";
import {TokenService} from "app/security/shared/token.service";
import {PlatformLocation} from "@angular/common";
import {GlobalEventManagementService} from "../../core/global-event-management.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild {
  private LOGIN_PATH: string = "/provider-ui/login";

  constructor(private apiUrlService: ApiUrlService,
              private authorizationService: AuthorizationService,
              private notificationService: NotificationService,
              private router: Router,
              private tokenService: TokenService,
              private utilityService: UtilityService,
              private location: PlatformLocation,
              private globalEventManagementService: GlobalEventManagementService) {

    location.onPopState(() => {
      if(window.location.pathname === this.LOGIN_PATH){
        this.globalEventManagementService.setShowHeader(false);
        sessionStorage.clear();
      }
    });
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authorizationService.canAccess()) {
      if (state.url.includes(this.apiUrlService.getPatientConsentsCreateUrl())) {
        this.assertHasEnoughProviders();
      }
      return true;
    } else {
      this.router.navigate([this.apiUrlService.getLoginUrl()], {queryParams: {redirectUrl: state.url}});
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
