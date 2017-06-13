import {Identifier} from "../../shared/identifier.model";

export class Consent {
  id: number;
  fromProviders: Identifier[];
  toProviders: Identifier[];
  shareSensitivityCategories: Identifier[];
  sharePurposes: Identifier[];
  startDate: Date;
  endDate: Date;

  constructor() {
    this.fromProviders = [new Identifier(null, null)];
    this.toProviders = [new Identifier(null, null)];
    this.shareSensitivityCategories = [new Identifier(null, null)];
    this.sharePurposes = [new Identifier(PURPOSE_OF_USE_SYSTEM, "TREAT")];
    this.startDate = new Date;
    this.endDate = new Date;
  }
}

export const PURPOSE_OF_USE_SYSTEM = "http://hl7.org/fhir/v3/ActReason";
