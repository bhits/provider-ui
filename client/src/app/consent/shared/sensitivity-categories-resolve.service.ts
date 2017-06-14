import {Injectable} from "@angular/core";
import {ConsentService} from "./consent.service";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {VssSensitivityCategory} from "app/consent/shared/vss-sensitivity-category.model";

@Injectable()
export class SensitivityCategoriesResolveService implements Resolve<any> {
  constructor(private consentService: ConsentService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<VssSensitivityCategory[]> {
    return this.consentService.getSensitivityCategories()
      .do((sensitivityCategories: VssSensitivityCategory[]) => {
        return sensitivityCategories
      });
  }
}
