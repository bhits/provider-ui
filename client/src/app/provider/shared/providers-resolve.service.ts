import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ProviderService} from "./provider.service";
import {Patient} from "../../patient/shared/patient.model";
import {Provider} from "./provider.model";
import {PatientService} from "app/patient/shared/patient.service";
import {NotificationService} from "app/shared/notification.service";

@Injectable()
export class ProvidersResolveService implements Resolve<any> {
  private patient: Patient;

  constructor(private notificationService: NotificationService,
              private patientService: PatientService,
              private providerService: ProviderService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Provider[]> {
    this.getSelectedPatient(route);
    let patient: Patient = this.patient;
    if (patient != null) {
      return this.providerService.getProviders(patient.mrn)
        .do((providers: Provider[]) => {
          return providers
        });
    }
  }

  private getSelectedPatient(route: ActivatedRouteSnapshot): void {
    this.patientService.getPatient(this.determinePatientId(route))
      .subscribe(
        (patient) => {
          this.patient = patient;
        },
        err => {
          this.notificationService.show("Failed in getting providers.");
          console.log(err);
        }
      );
  }

  private determinePatientId(route: ActivatedRouteSnapshot): number {
    if (route.params['patientId'] != null) {
      return route.params['patientId'];
    } else {
      return route.parent.params['patientId'];
    }
  }
}
