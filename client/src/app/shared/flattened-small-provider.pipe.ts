import {Pipe, PipeTransform} from "@angular/core";
import {UtilityService} from "./utility.service";
import {FlattenedSmallProvider} from "./flattened-small-provider.model";

type ArgType = "fullName" | "address";

@Pipe({
  name: 'flattenedSmallProvider'
})
export class FlattenedSmallProviderPipe implements PipeTransform {

  constructor(private utilityService: UtilityService) {
  }

  transform(value: FlattenedSmallProvider, args?: ArgType): any {
    if (value) {
      switch (args) {
        case "fullName":
          return this.getName(value);
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

  private getName(provider: FlattenedSmallProvider) {
    let providerName: string;
    switch (provider.entityTypeDisplayName) {
      case "Individual":
        providerName = this.utilityService.getFullName(provider);
        break;
      case "Organization":
        providerName = provider.organizationName;
        break;
    }
    return providerName;
  }
}
