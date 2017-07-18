import {Component, OnInit} from "@angular/core";
import {ApiUrlService} from "../../shared/api-url.service";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-patient-search-card',
  templateUrl: './patient-search-card.component.html',
  styleUrls: ['./patient-search-card.component.scss']
})
export class PatientSearchCardComponent implements OnInit {

  constructor(private apiUrlService: ApiUrlService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
  }

  public navigateTo(): void {
    this.utilityService.navigateTo(this.apiUrlService.getPatientSearchUrl());
  }
}
