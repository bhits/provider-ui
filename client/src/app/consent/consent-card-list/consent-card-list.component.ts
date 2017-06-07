import {Component, Input, OnInit} from "@angular/core";
import {Patient} from "../../patient/shared/patient.model";
import {ApiUrlService} from "../../shared/api-url.service";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-consent-card-list',
  templateUrl: './consent-card-list.component.html',
  styleUrls: ['./consent-card-list.component.scss']
})
export class ConsentCardListComponent implements OnInit {
  @Input()
  public patient: Patient;

  constructor(private apiUrlService: ApiUrlService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
  }

  public redirectToPatientConsentsCreate(): void {
    const searchPatientProvidersUrl: string = "/patients".concat("/" + this.patient.id).concat(this.apiUrlService.getPatientConsentsCreateUrl());
    this.utilityService.navigateTo(searchPatientProvidersUrl)
  }
}
