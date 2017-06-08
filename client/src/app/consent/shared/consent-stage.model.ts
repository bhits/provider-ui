import {ConsentStageOption} from "./consent-stage-option.model";

export class ConsentStage {
  consentStage: string;
  text: string;
  icon: string;
  color: string;
  options: ConsentStageOption[];
}
