import {Component, OnInit} from "@angular/core";
import {Profile} from "../../core/profile.model";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {ProfileService} from "../../security/shared/profile.service";

@Component({
  selector: 'c2s-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userName: String;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.userName = this.profileService.getFullName();
  }
}
