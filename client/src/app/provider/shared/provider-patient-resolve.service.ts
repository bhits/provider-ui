import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {PatientService} from "../../patient/shared/patient.service";
import {Observable} from "rxjs/Observable";
import {Patient} from "../../patient/shared/patient.model";

@Injectable()
export class ProviderPatientResolveService implements Resolve<any> {

  constructor(private patientService: PatientService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Patient> {
    let patientId: number = route.parent.params['patientId'];
    return this.patientService.getPatient(patientId)
      .do((patient: Patient) => {
        return patient
      });
  }
}
