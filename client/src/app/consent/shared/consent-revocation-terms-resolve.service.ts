import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ConsentService} from "./consent.service";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {ConsentTerms} from "./consent-terms.model";

@Injectable()
export class ConsentRevocationTermsResolveService {
  constructor(private consentService: ConsentService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.consentService.getConsentRevocationTerms()
      .do((terms: ConsentTerms) => {
        return terms;
      });
  }

}
