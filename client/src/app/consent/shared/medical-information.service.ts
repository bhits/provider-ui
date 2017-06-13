import {Injectable} from "@angular/core";
import {VssSensitivityCategory} from "./vss-sensitivity-category.model";
import {Identifier} from "../../shared/identifier.model";
import {Consent} from "./consent.model";

@Injectable()
export class MedicalInformationService {
  private VALUE = 'value';
  private CHECK = 'checked';
  private DISPLAY = 'displayName';

  constructor() {
  }

  public setSensitivityPoliciesStatusToUnChecked(sensitivityCategories: VssSensitivityCategory[]) {
    sensitivityCategories.forEach(s => s[this.CHECK] = false);
  }

  public setSensitivityPoliciesStatusToChecked(sensitivityCategories: VssSensitivityCategory[]) {
    sensitivityCategories.forEach(s => s[this.CHECK] = true);
  }

  public mapConsentSensitivityCategoriesToSensitivityCategories(consent: Consent, sensitivityCategories: VssSensitivityCategory[]): VssSensitivityCategory[] {
    let selected: VssSensitivityCategory[] = [];
    this.setSensitivityPoliciesStatusToUnChecked(sensitivityCategories);

    consent.shareSensitivityCategories.forEach(s1 => {
      sensitivityCategories.forEach(s2 => {
        if (s1[this.VALUE] === s2.code) {
          s2[this.CHECK] = true;
          selected.push(s2);
        }
      })
    });

    return selected;
  }

  public getSelectedSensitivityPolicyIdentifiers(sensitivityCategories: VssSensitivityCategory[]): Identifier[] {
    let selected: Identifier[] = [];
    sensitivityCategories.forEach(sensitivityCategory => {
      if (sensitivityCategory[this.CHECK]) {
        selected.push(new Identifier(sensitivityCategory.system, sensitivityCategory.code));
      }
    });
    return selected;
  }

  public getSelectedSensitivityPolicies(sensitivityCategories: VssSensitivityCategory[]): string[] {
    let selected: string[] = [];
    sensitivityCategories.forEach(sensitivityCategory => {
      if (sensitivityCategory[this.CHECK]) {
        selected.push(sensitivityCategory[this.DISPLAY])
      }
    });
    return selected;
  }
}
