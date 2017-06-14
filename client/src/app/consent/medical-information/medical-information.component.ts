import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ConsentService} from "../shared/consent.service";
import {Consent} from "app/consent/shared/consent.model";
import {VssSensitivityCategory} from "../shared/vss-sensitivity-category.model";
import {MedicalInformationService} from "../shared/medical-information.service";
import {Md2DialogConfig} from "md2";

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.scss']
})
export class MedicalInformationComponent implements OnInit {
  public sensitivityCategories: VssSensitivityCategory[];
  public selectedSensitivityCategories: string[];
  public sensitivityCategoryCodes: string[] = [];
  public isShareAll: number;
  public isAllCategoriesSelected: boolean = false;
  public federalInfo = {
    title: "Federal Categories",
    description: 'Federal requirements strictly restrict health professionals from disclosing substance abuse treatment information without signed patient consent ' +
    '(called <a href="http://www.samhsa.gov/about-us/who-we-are/laws/confidentiality-regulations-faqs" target="_blank"> 42 CFR Part 2 <i class="fa fa-external-link"></i></a> ).' +
    'You have the right to choose the information you wish to share or not share and with whom.'
  };
  public stateInfo = {
    title: "State Categories",
    description: 'Most states have laws restricting health professionals from disclosing information related to substance abuse, HIV/AIDS, and mental health. ' +
    'Some states have restrictions regarding genetic information and communicable diseases. You have the right to choose the information you wish to share or not share and with whom.'
  };
  private patientConsent: Consent;
  private dialogConfig: Md2DialogConfig = new Md2DialogConfig();

  constructor(private consentService: ConsentService,
              private medicalInformationService: MedicalInformationService,
              private route: ActivatedRoute) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.patientConsent = consent;
      }
    });
  }

  ngOnInit() {
    this.dialogConfig.disableClose = true;
    this.sensitivityCategories = this.route.snapshot.parent.data['sensitivityCategories'];
    let consentSensitivityCategories: VssSensitivityCategory[] = this.medicalInformationService.mapConsentSensitivityCategoriesToSensitivityCategories(this.patientConsent, this.sensitivityCategories);
    this.selectedSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicies(consentSensitivityCategories);
  }

  public onSelectShareAll(dialog: any, value: number) {
    this.isShareAll = value;
    this.selectedSensitivityCategories = [];
    this.sensitivityCategoryCodes = [];
    //Unchecked all checked boxes
    this.medicalInformationService.setSensitivityPoliciesStatusToChecked(this.sensitivityCategories);
    dialog.open(this.dialogConfig);
  }

  public onSelectDoNotShareAll(dialog: any, value: number) {
    this.checkAllCategoriesSelected();

    this.isShareAll = value;
    dialog.open(this.dialogConfig);
    this.patientConsent.shareSensitivityCategories.identifiers = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityCategories);
    this.consentService.setConsentEmitter(this.patientConsent);
  }

  public setSelectedMedicalInformation(dialog: any) {
    dialog.close();
    this.selectedSensitivityCategories = this.medicalInformationService.getSelectedSensitivityPolicies(this.sensitivityCategories);
    this.patientConsent.shareSensitivityCategories.identifiers = this.medicalInformationService.getSelectedSensitivityPolicyIdentifiers(this.sensitivityCategories);
    this.consentService.setConsentEmitter(this.patientConsent);
  }

  public confirmSelectAll(dialog: any) {
    this.setSelectedMedicalInformation(dialog);
  }

  public isCheckedAll() {
    if (this.isShareAll === 0) {
      this.checkAllCategoriesSelected();
    }
  }

  private checkAllCategoriesSelected() {
    this.isAllCategoriesSelected = this.medicalInformationService.isCheckedAll(this.sensitivityCategories);
  }
}
