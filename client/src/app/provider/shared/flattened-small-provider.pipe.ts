import {Pipe, PipeTransform} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

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
          return FlattenedSmallProviderPipe.getName(value);
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

  private static getName(provider: FlattenedSmallProvider) {
    let providerName: string;
    switch (provider.entityTypeDisplayName) {
      case "Individual":
        providerName = FlattenedSmallProviderPipe.getFullName(provider, 'firstName').concat(' ').concat(FlattenedSmallProviderPipe.getFullName(provider, 'middleName')).concat(' ').concat(FlattenedSmallProviderPipe.getFullName(provider, 'lastName'));
        break;
      case "Organization":
        providerName = provider.organizationName;
        break;
    }
    return providerName;
  }

  private static getFullName(provider: FlattenedSmallProvider, key: string) {
    if (provider !== null && provider[key]) {
      return provider[key];
    }
    return '';
  }
}
