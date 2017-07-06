import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {ConsentService} from "./consent.service";
import {SampleDocumentInfo} from "./sample-document-info.model";

@Injectable()
export class SampleDocumentResolveService implements Resolve<any> {
  constructor(private consentService: ConsentService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<SampleDocumentInfo[]> {
    return this.consentService.getSampleDocuments()
      .do((documents: SampleDocumentInfo[]) => {
        return documents;
      });
  }
}
