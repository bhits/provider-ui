import {PagedResourcesData} from "../../shared/paged-resources-data.model";
import {Links} from "../../shared/links.model";
import {Page} from "../../shared/page.model";
import {Patient} from "./patient.model";

export class PatientSearchResponse implements PagedResourcesData<Patient> {
  _embedded: Map<string, Patient[]>;
  _links: Links;
  page: Page;
}
