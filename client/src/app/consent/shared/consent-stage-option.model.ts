import {ConsentStageOptionKey} from "./consent-stage-option-key.enum";

export class ConsentStageOption {
  key: ConsentStageOptionKey;
  icon: string;
  text: string;
  routerLink?: string;
  isMethod?: boolean;
  isEnabled: boolean;
}
