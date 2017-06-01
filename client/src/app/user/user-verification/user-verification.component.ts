import {Component, Input, OnInit} from "@angular/core";
import {User} from "../shared/user.model";
import {UserService} from "app/user/shared/user.service";
import {NotificationService} from "app/shared/notification.service";
import {ACCOUNT_STATUSES, AccountStatus} from "app/user/shared/account-statuses.model";

@Component({
  selector: 'c2s-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  @Input()
  public user: User;
  public verified: boolean = false;
  public isAccountDisabled: boolean;
  public verificationCode: string;
  public accountStatusText: string = ACCOUNT_STATUSES.get(AccountStatus.NotActivated);

  constructor(private notificationService: NotificationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.isAccountDisabled = this.user.disabled;
    this.userService.getCurrentUserCreationInfo(this.user.id)
      .subscribe(
        (userActivationResponse) => {
          this.verificationCode = userActivationResponse.verificationCode;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Verified);
          if (userActivationResponse.verified) {
            this.verified = true;
            this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Activated);
            if (this.verified && this.user.disabled) {
              this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Disabled);
            }
          }
        },
        err => {
          console.log(err + ": Cause by Account Not Yet Activated.");
        }
      );
  }

  public sendVerificationEmail() {
    this.userService.initiateUserActivation(this.user.id)
      .subscribe(
        (userActivationResponse) => {
          this.notificationService.show("Email sent successfully");
          this.verificationCode = userActivationResponse.verificationCode;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Verified)
        },
        err => {
          this.notificationService.show("Failed to send email, please try again later...");
        }
      );
  }

  public disableAccount() {
    this.userService.disableUser(this.user.id)
      .subscribe(
        () => {
          this.isAccountDisabled = true;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Disabled);
          this.notificationService.show("Disable user account successfully");
        },
        err => {
          this.notificationService.show("Error in disable user account, please try again later...");
        }
      );
  }

  public enableAccount() {
    this.userService.enableUser(this.user.id)
      .subscribe(
        () => {
          this.isAccountDisabled = false;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Activated);
          this.notificationService.show("User account is back to work.");
        },
        err => {
          this.notificationService.show("Error in enable user account, please try again later...");
        }
      );
  }
}
