import {Pipe, PipeTransform} from "@angular/core";
import {CONSENT_STAGES} from "app/consent/shared/consent-stages.model";

type ArgType = "text" | "icon" | "color";

@Pipe({
  name: 'consentStage'
})
export class ConsentStagePipe implements PipeTransform {

  transform(value: any, arg?: ArgType): any {
    return CONSENT_STAGES
      .filter(stage => stage.consentStage === value)
      .map(stage => stage[arg])
      .pop();
  }
}
