import {Address} from "../../shared/address.model";

export class User {
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
}
