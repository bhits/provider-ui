import {Identifier} from "../../shared/identifier.model";
import {Identifiers} from "app/shared/identifiers.model";

export class Consent {
  id: number;
  consentReferenceId: string;
  fromProviders: Identifiers;
  toProviders: Identifiers;
  shareSensitivityCategories: Identifiers;
  sharePurposes: Identifiers;
  startDate: Date;
  endDate: Date;

  constructor() {
    this.fromProviders = new Identifiers([new Identifier(null, null)]);
    this.toProviders = new Identifiers([new Identifier(null, null)]);
    this.shareSensitivityCategories = new Identifiers([new Identifier(null, null)]);
    this.sharePurposes = new Identifiers([new Identifier(PURPOSE_OF_USE_SYSTEM, "TREAT")]);
    this.startDate = new Date;
    this.endDate = new Date;
  }
}

export const PURPOSE_OF_USE_SYSTEM = "http://hl7.org/fhir/v3/ActReason";
