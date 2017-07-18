import {MenuItem} from "./menu-item.model";

export const MENU_ITEMS: MenuItem[] = [
  new MenuItem("Home", "/home", "HOME.MENU.HOME"),
  new MenuItem("Patient-List", "/patients", "HOME.MENU.PATIENT_LIST"),
  new MenuItem("Patient-Search", "/patients/search", "HOME.MENU.PATIENT_SEARCH"),
  new MenuItem("Logout", "", "HOME.MENU.LOGOUT")
];
