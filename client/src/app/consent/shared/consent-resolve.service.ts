import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ConsentService} from "app/consent/shared/consent.service";
import {Patient} from "app/patient/shared/patient.model";
import {DetailedConsent} from "./detailed-consent.model";

@Injectable()
export class ConsentResolveService implements Resolve<any> {
  constructor(private consentService: ConsentService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<DetailedConsent> {
    let patient: Patient = this.getSelectedPatient(route);
    let consentId: number = route.params['consentId'];
    if (patient != null) {
      return this.consentService.getDetailedConsent(patient.mrn, consentId)
        .do((consent: DetailedConsent) => {
          return consent
        });
    }
  }

  private getSelectedPatient(route: ActivatedRouteSnapshot): Patient {
    if (route.parent.data['patient'] != null) {
      return route.parent.data['patient'];
    } else {
      return route.data['patient'];
    }
  }
}
