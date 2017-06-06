import {Pipe, PipeTransform} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

type ArgType = "npi" | "fullName" | "phone" | "address";

@Pipe({
  name: 'flattenedSmallProvider'
})
export class FlattenedSmallProviderPipe implements PipeTransform {

  constructor(private utilityService: UtilityService) {
  }

  transform(value: FlattenedSmallProvider, args?: ArgType): any {
    if (value) {
      switch (args) {
        case "npi":
          return value.id;
        case "fullName":
          return FlattenedSmallProviderPipe.getName(value, 'firstName').concat(' ').concat(FlattenedSmallProviderPipe.getName(value, 'middleName')).concat(' ').concat(FlattenedSmallProviderPipe.getName(value, 'lastName'));
        case "phone":
          return value.practiceLocationAddressTelephoneNumber;
        case "address":
          const address = [];
          if (value.firstLinePracticeLocationAddress ||
            value.secondLinePracticeLocationAddress ||
            value.practiceLocationAddressCityName ||
            value.practiceLocationAddressStateName ||
            value.practiceLocationAddressPostalCode) {
            address.push(value.firstLinePracticeLocationAddress || "");
            address.push(value.secondLinePracticeLocationAddress || "");
            address.push(value.practiceLocationAddressCityName || "");
            address.push(value.practiceLocationAddressStateName || "");
            address.push(this.utilityService.formatZipCode(value.practiceLocationAddressPostalCode || ""));
            return address.filter(field => field !== "").join(", ");
          } else {
            return address;
          }
      }
      return null;
    }
  }

  private static getName(provider: FlattenedSmallProvider, key: string) {
    if (provider !== null && provider[key]) {
      return provider[key];
    }
    return '';
  }
}
