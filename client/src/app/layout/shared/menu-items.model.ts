import {MenuItem} from "./menu-item.model";

export const MENU_ITEMS: MenuItem[] = [
  new MenuItem("Home",  "/home", "HOME.MENU.HOME"),
  new MenuItem("Patients",  "/patients", "HOME.MENU.PATIENTS"),
  new MenuItem("Logout",  "", "HOME.MENU.LOGOUT")
];
