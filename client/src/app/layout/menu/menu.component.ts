import {Component, OnInit} from "@angular/core";
import {MenuItem} from "../shared/menu-item.model";
import {MENU_ITEMS} from "../shared/menu-items.model";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: MenuItem[];

  constructor(private authenticationService: AuthenticationService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.menuItems = MENU_ITEMS;
  }

  navigateTo(text: string, routerLink: string) {
    switch (text) {
      case 'Logout':
        this.authenticationService.logout();
        break;
      default:
        this.utilityService.navigateTo(routerLink);
    }
  }
}
