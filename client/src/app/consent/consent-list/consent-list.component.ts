import {Component, Input, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {Patient} from "../../patient/shared/patient.model";
import {ApiUrlService} from "app/shared/api-url.service";

@Component({
  selector: 'c2s-consent-list',
  templateUrl: './consent-list.component.html',
  styleUrls: ['./consent-list.component.scss']
})
export class ConsentListComponent implements OnInit {
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
