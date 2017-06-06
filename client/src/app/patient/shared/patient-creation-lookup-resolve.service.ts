import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {PatientCreationLookupService} from "./patient-creation-lookup.service";
import {Observable} from "rxjs/Observable";
import {PatientCreationLookupInfo} from "./patient-creation-lookup-info.model";

@Injectable()
export class PatientCreationLookupResolveService implements Resolve<any> {

  constructor(public patientCreationLookupService: PatientCreationLookupService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PatientCreationLookupInfo> {
    return this.patientCreationLookupService.getPatientCreationLookupInfo()
      .do((patientCreationLookupInfo: PatientCreationLookupInfo) => {
        return patientCreationLookupInfo;
      });
  }
}
