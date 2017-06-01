import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserService} from "./user.service";
import {User} from "app/user/shared/user.model";

@Injectable()
export class UserResolveService implements Resolve<any> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    let userId: number = route.params['userId'];
    return this.userService.getUser(userId)
      .do((user: User) => {
        return user
      });
  }

}
