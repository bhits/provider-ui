export class MenuItem {
  public key: string;
  public routerLink: string;
  public text: string;

  constructor(key: string, routerLink: string, text: string) {
    this.key = key;
    this.routerLink = routerLink;
    this.text = text;
  }
}
