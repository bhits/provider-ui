import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {ConfigService} from "../../core/config.service";

@Injectable()
export class CanActivatePatientListService implements CanActivate, CanActivateChild {

  constructor(private configService: ConfigService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.configService.getConfigInSessionStorage().providerPermissions.patientListCardEnabled;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
