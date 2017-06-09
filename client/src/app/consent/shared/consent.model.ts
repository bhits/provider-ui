import {Identifier} from "../../shared/identifier.model";

export class Consent {
  id: number;
  fromProviders: Identifier[];
  toProviders: Identifier[];
  shareSensitivityCategories: Identifier[];
  sharePurposes: Identifier[];
  startDate: Date;
  endDate: Date;
}
