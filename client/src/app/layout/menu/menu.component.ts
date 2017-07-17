import {Component, OnInit} from "@angular/core";
import {MenuItem} from "../shared/menu-item.model";
import {MENU_ITEMS} from "../shared/menu-items.model";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {UtilityService} from "../../shared/utility.service";
import {ConfigService} from "app/core/config.service";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private isProviderListCardEnabled: boolean;

  constructor(private authenticationService: AuthenticationService,
              private configService: ConfigService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.isProviderListCardEnabled = this.configService.getConfigInSessionStorage().providerPermissions.patientListCardEnabled;
  }

  public getEnabledMenuItems(): MenuItem[] {
    return MENU_ITEMS.filter(menuItem => this.isShowInMenu(menuItem));
  }

  private isShowInMenu(menuItem: MenuItem): boolean {
    switch (menuItem.key) {
      case "Patient-List":
        return this.isProviderListCardEnabled;
      default:
        return true;
    }
  }

  public navigateTo(key: string, routerLink: string) {
    switch (key) {
      case 'Logout':
        this.authenticationService.logout();
        break;
      default:
        this.utilityService.navigateTo(routerLink);
    }
  }
}
