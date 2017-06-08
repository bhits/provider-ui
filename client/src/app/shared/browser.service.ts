import {Injectable} from "@angular/core";

@Injectable()
export class BrowserService {

  constructor() {
  }

  public detectBrowser(): string {
    const userAgent = window.navigator.userAgent;
    const browsers = {
      chrome: /chrome/i,
      safari: /safari/i,
      firefox: /firefox/i,
      ie: /internet explorer/i
    };

    for (let key in browsers) {
      if (browsers[key].test(userAgent)) {
        return key;
      }
    }
    return 'unknown';
  }

  public isChrome(): boolean {
    return this.detectBrowser() === 'chrome';
  }

  public isFireFox(): boolean {
    return this.detectBrowser() === 'firefox';
  }

  public isIE(): boolean {
    return this.detectBrowser() === 'ie' || navigator.appVersion.toString().indexOf('.NET') > 0;
  }

  public isSafari(): boolean {
    return this.detectBrowser() === 'safari';
  }
}
