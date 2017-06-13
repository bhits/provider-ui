import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {PatientService} from "./patient.service";
import {Patient} from "app/patient/shared/patient.model";

@Injectable()
export class PatientResolveService implements Resolve<any> {

  constructor(private patientService: PatientService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Patient> {
    let patientId: number = route.params['patientId'];
    return this.patientService.getPatient(patientId)
      .do((patient: Patient) => {
        return patient
      });
  }
}
