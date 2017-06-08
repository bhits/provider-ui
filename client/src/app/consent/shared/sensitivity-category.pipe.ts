import {Pipe, PipeTransform} from "@angular/core";
import {ShareSensitivityCategory} from "./share-sensitivity-category.model";

type ArgType = "display" | "description" | "system" | "value";

@Pipe({
  name: 'sensitivityCategory'
})
export class SensitivityCategoryPipe implements PipeTransform {

  transform(value: ShareSensitivityCategory, args?: ArgType): any {
    if (value != null) {
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
    return null;
  }
}
