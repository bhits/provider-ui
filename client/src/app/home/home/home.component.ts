import {Component, OnInit} from "@angular/core";
import {ApiUrlService} from "../../shared/api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {UserService} from "../../user/shared/user.service";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public numberOfUsers: number = 0;

  constructor(private apiUrlService: ApiUrlService,
              private userService: UserService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    const FIRST_PAGE: number = 0;
    this.userService.getUsers(FIRST_PAGE)
      .subscribe(
        (users) => {
          this.numberOfUsers = users.totalElements
        },
        (err) => {
          console.log(err);
        }
      );
  }

  navigateTo() {
    this.utilityService.navigateTo(this.apiUrlService.getUserListUrl());
  }
}
