import {Address} from "../../shared/address.model";
import {Identifier} from "../../shared/identifier.model";

export class Patient {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  homeEmail?: string;
  workEmail?: string;
  birthDate: Date;
  genderCode: string;
  socialSecurityNumber?: string;
  homePhone?: string;
  workPhone?: string;
  homeAddress?: Address;
  workAddress?: Address;
  roles: string[];
  locale: string;
  disabled?: boolean;
  mrn?: string;
  identifiers:Identifier[];
  registrationPurposeEmail?:string
}
