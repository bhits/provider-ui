import {PagedResourcesData} from "../../shared/paged-resources-data.model";
import {Links} from "../../shared/links.model";
import {Page} from "../../shared/page.model";
import {BasePatientCreationLookup} from "../../patient/shared/base-patient-creation-lookup.model";

export class ProviderSearchStateCodes implements PagedResourcesData<BasePatientCreationLookup> {
  _embedded: Map<string, BasePatientCreationLookup[]>;
  _links: Links;
  page: Page;
}
