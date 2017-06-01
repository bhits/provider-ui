import {Injectable} from "@angular/core";
import {TokenService} from "./token.service";
import {GlobalEventManagementService} from "app/core/global-event-management.service";

@Injectable()
export class AuthorizationService {

  constructor(private globalEventManagementService: GlobalEventManagementService,
              private tokenService: TokenService) {
  }

  public canAccess(): boolean {
    const ADMIN_ACCESS_SCOPE: string = "providerUi.access";
    if (this.tokenService.hasScope(ADMIN_ACCESS_SCOPE)) {
      this.globalEventManagementService.setShowHeader(true);
      return true;
    } else {
      this.tokenService.deleteOauthToken();
      return false;
    }
  }
}
