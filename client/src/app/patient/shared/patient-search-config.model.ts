import {Role} from "./role.model";
import {BasePatientCreationLookup} from "./base-patient-creation-lookup.model";
import {IdentifierSystem} from "./IdentifierSystem.model";

export class PatientSearchConfig {
  public firstNameSearchEnabled:boolean;
  public lastNameSearchEnabled:boolean;
  public dateOfBirthSearchEnabled:boolean;
  public genderSearchEnabled:boolean;
  public patientIdSearchEnabled:boolean;
}
