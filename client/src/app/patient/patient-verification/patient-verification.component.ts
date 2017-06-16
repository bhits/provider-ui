import {Component, Input, OnInit} from "@angular/core";
import {Patient} from "../shared/patient.model";
import {PatientService} from "app/patient/shared/patient.service";
import {NotificationService} from "app/shared/notification.service";
import {ACCOUNT_STATUSES, AccountStatus} from "app/patient/shared/account-statuses.model";

@Component({
  selector: 'c2s-patient-verification',
  templateUrl: './patient-verification.component.html',
  styleUrls: ['./patient-verification.component.scss']
})
export class PatientVerificationComponent implements OnInit {
  @Input()
  public patient: Patient;
  public verified: boolean = false;
  public isAccountDisabled: boolean;
  public verificationCode: string;
  public accountStatusText: string = ACCOUNT_STATUSES.get(AccountStatus.NotActivated);

  constructor(private notificationService: NotificationService,
              private patientService: PatientService) {
  }

  ngOnInit() {
    this.isAccountDisabled = this.patient.disabled;
    this.patientService.getCurrentPatientCreationInfo(this.patient.id)
      .subscribe(
        (patientActivationResponse) => {
          this.verificationCode = patientActivationResponse.verificationCode;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Verified);
          if (patientActivationResponse.verified) {
            this.verified = true;
            this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Activated);
            if (this.verified && this.patient.disabled) {
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
    this.patientService.initiatePatientActivation(this.patient.id)
      .subscribe(
        (patientActivationResponse) => {
          this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.SUCCESS_SENT_EMAIL");
          this.verificationCode = patientActivationResponse.verificationCode;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Verified)
        },
        err => {
          this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.FAILED_SENT_EMAIL");
        }
      );
  }

  public disableAccount() {
    this.patientService.disablePatient(this.patient.id)
      .subscribe(
        () => {
          this.isAccountDisabled = true;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Disabled);
          this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.SUCCESS_DISABLE_ACCOUNT");
        },
        err => {
          this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.FAILED_DISABLE_ACCOUNT");
        }
      );
  }

  public enableAccount() {
    this.patientService.enablePatient(this.patient.id)
      .subscribe(
        () => {
          this.isAccountDisabled = false;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Activated);
          this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.SUCCESS_ENABLE_ACCOUNT");
        },
        err => {
          this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.FAILED_ENABLE_ACCOUNT");
        }
      );
  }
}
