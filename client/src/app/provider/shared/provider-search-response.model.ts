import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

import {PagedResourcesData} from "../../shared/paged-resources-data.model";
import {Links} from "../../shared/links.model";
import {Page} from "../../shared/page.model";

export class ProviderSearchResponse implements PagedResourcesData<FlattenedSmallProvider> {
  _embedded: Map<string, FlattenedSmallProvider[]>;
  _links: Links;
  page: Page;
}
