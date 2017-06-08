import {Provider} from "../../provider/shared/provider.model";
import {ShareSensitivityCategory} from "./share-sensitivity-category.model";
import {SharePurpose} from "./share-purpose.model";

export class Consent {
  id: number;
  consentStage: string;
  fromProviders: Provider[];
  toProviders: Provider[];
  shareSensitivityCategories: ShareSensitivityCategory[];
  sharePurposes: SharePurpose[];
  startDate: Date;
  endDate: Date;
}
