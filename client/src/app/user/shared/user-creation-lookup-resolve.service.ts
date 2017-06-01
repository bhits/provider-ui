import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {UserCreationLookupService} from "./user-creation-lookup.service";
import {Observable} from "rxjs/Observable";
import {UserCreationLookupInfo} from "./user-creation-lookup-info.model";

@Injectable()
export class UserCreationLookupResolveService implements Resolve<any> {

  constructor(public userCreationLookupService: UserCreationLookupService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<UserCreationLookupInfo> {
    return this.userCreationLookupService.getUserCreationLookupInfo()
      .do((userCreationLookupInfo: UserCreationLookupInfo) => {
        return userCreationLookupInfo;
      });
  }
}
