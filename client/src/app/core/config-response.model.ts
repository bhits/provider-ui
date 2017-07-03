import {Oauth2} from "app/core/oauth2.model";
import {ProviderPermissions} from "./provider-permissions.model";

export class ConfigResponse {
  oauth2: Oauth2;
  providerPermissions: ProviderPermissions;
}
