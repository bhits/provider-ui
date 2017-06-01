import {Component, OnInit} from "@angular/core";
import {Profile} from "../../core/profile.model";
import {AuthenticationService} from "../../security/shared/authentication.service";

@Component({
  selector: 'c2s-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public profile: Profile;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.getUserInfo()
      .subscribe(
        (res) => {
          this.profile = new Profile(res.name);
        },
        error => {
          console.log(error);
        }
      );
  }
}
