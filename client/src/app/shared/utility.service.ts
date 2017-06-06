import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class UtilityService {

  constructor(private router: Router) {
  }

  public navigateTo(url: string) {
    this.router.navigate([url]);
  }

  public formatZipCode(zipCode: string): string {
    if (zipCode.length > 5) {
      zipCode = zipCode.slice(0, 5) + "-" + zipCode.slice(5);
    }
    return zipCode;
  }

  public convertJsonObjToStrMap(jsonStr) {
    const strMap = new Map();
    for (let k of Object.keys(jsonStr)) {
      strMap.set(k, jsonStr[k]);
    }
    return strMap;
  }
}
