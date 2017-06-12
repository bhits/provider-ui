import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ConsentService} from "../shared/consent.service";
import {Consent} from "app/consent/shared/consent.model";
import {VssSensitivityCategory} from "../shared/vss-sensitivity-category.model";

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.scss']
})
export class MedicalInformationComponent implements OnInit {
  public sensitivityCategories: VssSensitivityCategory[];
  private patientConsent: Consent;

  constructor(private consentService: ConsentService,
              private route: ActivatedRoute) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.patientConsent = consent;
      }
    });
  }

  ngOnInit() {
    this.sensitivityCategories = this.route.snapshot.parent.data['sensitivityCategories'];
  }
}
