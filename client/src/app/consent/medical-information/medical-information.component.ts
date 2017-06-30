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
  public readonly shareAllValue: number = 1;
  public readonly notShareAllValue: number = 0;
  public sensitivityCategories: VssSensitivityCategory[];
  public selectedSensitivityCategories: string[];
  public sensitivityCategoryCodes: string[] = [];
  public isShareAll: number;
  public isInvalidNotShareAll: boolean = false;
  public federalInfo = {
    title: 'CONSENT.MEDICAL_INFORMATION.DIALOG.FED_TITLE',
    description: 'CONSENT.MEDICAL_INFORMATION.DIALOG.FED_DESCRIPTION'
  };
  public stateInfo = {
    title: 'CONSENT.MEDICAL_INFORMATION.DIALOG.STATE_TITLE',
    description: 'CONSENT.MEDICAL_INFORMATION.DIALOG.STATE_DESCRIPTION'
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
    this.isInvalidNotShareAll = false;
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

  public confirmSelectAll(dialog: any): void {
    this.setSelectedMedicalInformation(dialog);
  }

  public isCheckedAll(): void {
    if (this.isShareAll === 0) {
      this.checkAllCategoriesSelected();
    }
  }

  private checkAllCategoriesSelected(): void {
    this.isInvalidNotShareAll = this.medicalInformationService.isCheckedAll(this.sensitivityCategories);
  }
}
