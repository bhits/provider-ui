import {Identifier} from "../../shared/identifier.model";
import {Address} from "../../shared/address.model";

export class ConsentProvider {
  id: number;
  npi?: string;
  identifiers: Identifier[];
  address: Address;
  providerType: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  deletable: boolean;
}
export const FHIR_US_NPI_SYSTEM = "http://hl7.org/fhir/sid/us-npi";
