import {Role} from "./role.model";
import {BasePatientCreationLookup} from "./base-patient-creation-lookup.model";
import {IdentifierSystem} from "./IdentifierSystem.model";

export class PatientCreationLookupInfo {
  public roles: Role[];
  public genderCodes: BasePatientCreationLookup[];
  public stateCodes: BasePatientCreationLookup[];
  public countryCodes: BasePatientCreationLookup[];
  public locales: BasePatientCreationLookup[];
  public identifierSystems: IdentifierSystem[];
}
