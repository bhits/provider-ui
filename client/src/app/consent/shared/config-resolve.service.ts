import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ConfigService} from "../../core/config.service";
import {Observable} from "rxjs/Observable";
import {ProviderPermissions} from "../../core/provider-permissions.model";

@Injectable()
export class ConfigResolveService implements Resolve<any> {

  constructor(private configService: ConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ProviderPermissions> {
    return this.configService.getProviderPermissions()
      .do((uiPermissions: ProviderPermissions) => {
        return uiPermissions;
      });
  }
}
