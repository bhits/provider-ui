import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {SampleDocumentInfo} from "./sample-document-info.model";
import {TryPolicyService} from "app/consent/shared/try-policy.service";

@Injectable()
export class SampleDocumentResolveService implements Resolve<any> {
  constructor(private tryPolicyService: TryPolicyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<SampleDocumentInfo[]> {
    return this.tryPolicyService.getSampleDocuments()
      .do((documents: SampleDocumentInfo[]) => {
        return documents;
      });
  }
}
