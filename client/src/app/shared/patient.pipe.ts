import {Pipe, PipeTransform} from "@angular/core";
import {Patient} from "../patient/shared/patient.model";
import {UtilityService} from "./utility.service";

type ArgType =
  "id"
  | "fullName"
  | "birthDate"
  | "genderCode"
  | "homePhone"
  | "workPhone"
  | "homeAddress"
  | "workAddress";

@Pipe({
  name: 'patient'
})
export class PatientPipe implements PipeTransform {

  constructor(private utilityService: UtilityService) {
  }

  transform(value: Patient, args?: ArgType): any {
    if (value) {
      switch (args) {
        case "id":
          return value.id;
        case "fullName":
          return PatientPipe.getName(value, 'firstName').concat(' ').concat(PatientPipe.getName(value, 'middleName')).concat(' ').concat(PatientPipe.getName(value, 'lastName'));
        case "birthDate":
          return value.birthDate;
        case "genderCode":
          return value.genderCode;
        case "homePhone":
          return value.homePhone;
        case "workPhone":
          return value.workPhone;
        case "homeAddress":
          const homeAddress = [];
          if (value.homeAddress != null) {
            homeAddress.push(value.homeAddress.line1 || "");
            homeAddress.push(value.homeAddress.line2 || "");
            homeAddress.push(value.homeAddress.city || "");
            homeAddress.push(value.homeAddress.stateCode || "");
            homeAddress.push(this.utilityService.formatZipCode(value.homeAddress.postalCode || ""));
            homeAddress.push(value.homeAddress.countryCode || "");
            return homeAddress.filter(field => field !== "").join(", ");
          } else {
            return homeAddress;
          }
        case "workAddress":
          const workAddress = [];
          if (value.workAddress != null) {
            workAddress.push(value.workAddress.line1 || "");
            workAddress.push(value.workAddress.line2 || "");
            workAddress.push(value.workAddress.city || "");
            workAddress.push(value.workAddress.stateCode || "");
            workAddress.push(this.utilityService.formatZipCode(value.workAddress.postalCode || ""));
            workAddress.push(value.workAddress.countryCode || "");
            return workAddress.filter(field => field !== "").join(", ");
          } else {
            return workAddress;
          }
      }
    }
    return null;
  }

  private static getName(patient: Patient, key: string): string {
    if (patient !== null && patient[key]) {
      return patient[key];
    }
    return ''
  }
}
