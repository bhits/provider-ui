import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {Patient} from "../../patient/shared/patient.model";
import {ActivatedRoute} from "@angular/router";
import {Consent} from "../shared/consent.model";
import {ConsentService} from "app/consent/shared/consent.service";
import {NotificationService} from "app/shared/notification.service";

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.scss']
})
export class ConsentCreateEditComponent implements OnInit {
  public consent: Consent;
  private selectedPatient: Patient;
  private consentListUrl: string;

  constructor(private consentService: ConsentService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.selectedPatient = this.route.snapshot.parent.data['patient'];
    this.consentListUrl = "/patients".concat("/" + this.selectedPatient.id);

    //Consent Create Mode
    this.consent = new Consent();
    this.consentService.setConsentEmitter(this.consent);

    this.route.params.subscribe(
      params => {
        if (params['consentId']) {
          //Consent Edit Mode
          let consent: Consent = this.route.snapshot.data['consentId'];
          this.consentService.setConsentEmitter(consent);
        }
      });
  }

  public cancel(): void {
    this.utilityService.navigateTo(this.consentListUrl);
  }

  public createEditConsent() {
    if (this.consent.id != null) {
      //Consent Edit Mode
    } else {
      // Consent Create Mode
      this.consentService.createConsent(this.selectedPatient.mrn, this.consent)
        .subscribe(
          () => {
            this.utilityService.navigateTo(this.consentListUrl);
          },
          err => {
            this.notificationService.show("Error in creating consent.");
          }
        );
    }
  }
}
