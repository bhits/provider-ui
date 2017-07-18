import {RegistrationConfig} from "./registration-config.model";
import {PatientSearchConfig} from "app/patient/shared/patient-search-config.model";

export class ProviderPermissions {
  consentSignEnabled: boolean;
  consentRevokeEnabled: boolean;
  userActivationEnabled: boolean;
  segmentationEnabled: boolean;
  patientListCardEnabled: boolean;
  registration: RegistrationConfig;
  patientSearch: PatientSearchConfig;
}
