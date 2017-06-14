import {Injectable} from "@angular/core";
import {ConsentService} from "./consent.service";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {SharePurpose} from "./share-purpose.model";

@Injectable()
export class PurposeOfUsesResolveService implements Resolve<any> {
  constructor(private consentService: ConsentService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<SharePurpose[]> {
    return this.consentService.getPurposeOfUses()
      .do((sharePurposes: SharePurpose[]) => {
        return sharePurposes
      });
  }
}
