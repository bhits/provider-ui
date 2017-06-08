import {Pipe, PipeTransform} from "@angular/core";
import {SharePurpose} from "./share-purpose.model";

type ArgType = "display" | "description" | "system" | "value";

@Pipe({
  name: 'sharePurpose'
})
export class SharePurposePipe implements PipeTransform {

  transform(value: SharePurpose, args?: ArgType): any {
    switch (args) {
      case "display":
        return value.display;
      case "description":
        return value.description;
      case "system":
        return value.identifier.system;
      case "value":
        return value.identifier.value;
    }
  }
}
