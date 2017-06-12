import {Injectable} from "@angular/core";
import {SharePurpose} from "./share-purpose.model";
import {Identifier} from "../../shared/identifier.model";
import {Consent} from "./consent.model";

@Injectable()
export class PurposeOfUseService {

  private VALUE = 'value';
  private CHECK = 'checked';
  private DISPLAY = 'display';

  constructor() {
  }

  public setPurposeOfUseStatusToChecked(purposeOfUses: SharePurpose[]) {
    purposeOfUses.forEach(p => p[this.CHECK] = true);
  }

  public mapConsentSharePurposesToSharePurposes(consent: Consent, purposeOfUses: SharePurpose[]): SharePurpose[] {
    let selected: SharePurpose[] = [];
    this.setPurposeOfUseStatusToUnChecked(purposeOfUses);

    consent.sharePurposes.forEach(p1 => {
        purposeOfUses.forEach(p2 => {
          if (p1[this.VALUE] === p2.identifier[this.VALUE]) {
            p2[this.CHECK] = true;
            selected.push(p2);
          }
        })
      }
    );
    return selected;
  }

  setPurposeOfUseStatusToUnChecked(purposeOfUses: SharePurpose[]) {
    purposeOfUses.forEach(purposeOfUse => purposeOfUse[this.CHECK] = false);
  }

  public getSelectedPurposeOfUse(purposeOfUSes: SharePurpose[]): Identifier[] {
    let selected: Identifier[] = [];
    purposeOfUSes.forEach(sharePurpose => {
      if (sharePurpose['checked']) {
        selected.push(new Identifier(sharePurpose.identifier.system, sharePurpose.identifier.value));
      }
    });

    return selected;
  }

  public getCheckedPurposeOfUse(purposeOfUse: SharePurpose[]): string[] {
    let checkedPurposeOfUse: string[] = [];
    purposeOfUse.forEach(p => {
      if (p[this.CHECK]) {
        checkedPurposeOfUse.push(p[this.DISPLAY])
      }
    });

    return checkedPurposeOfUse;
  }

  public updateSelectedPurposeOfUse(checkedPurposOfUse: string[], purposeOfUse: SharePurpose[]) {
    checkedPurposOfUse.forEach(value => {
        purposeOfUse.forEach(p2 => {
          if (value === p2[this.VALUE]) {
            p2[this.CHECK] = true;
          }
        })
      }
    );
  }
}
