import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {ApiUrlService} from "../../shared/api-url.service";
import {Patient} from "../../patient/shared/patient.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'c2s-consent-create-edit',
  templateUrl: './consent-create-edit.component.html',
  styleUrls: ['./consent-create-edit.component.scss']
})
export class ConsentCreateEditComponent implements OnInit {
  private selectedPatient: Patient;
  private consentListUrl: string;

  constructor(private apiUrlService: ApiUrlService,
              private route: ActivatedRoute,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.selectedPatient = this.route.snapshot.parent.data['patient'];
    this.consentListUrl = "/patients".concat("/" + this.selectedPatient.id);
  }

  public cancel(): void {
    this.utilityService.navigateTo(this.consentListUrl);
  }
}
