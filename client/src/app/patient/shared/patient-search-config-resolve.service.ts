import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {PatientSearchConfigService} from "./patient-search-config.service";
import {PatientSearchConfig} from "./patient-search-config.model";

@Injectable()
export class PatientSearchConfigResolveService implements Resolve<any> {

  constructor(public patientSearchConfigService: PatientSearchConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PatientSearchConfig> {
    return this.patientSearchConfigService.getPatientSearchConfig()
      .do((patientSearchConfig: PatientSearchConfig) => {
        return patientSearchConfig;
      });
  }
}
