import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ProviderService} from "./provider.service";
import {Patient} from "../../patient/shared/patient.model";
import {Provider} from "./provider.model";

@Injectable()
export class ProvidersResolveService implements Resolve<any> {

  constructor(private providerService: ProviderService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Provider[]> {
    let patient: Patient = this.getSelectedPatient(route);
    if (patient != null) {
      return this.providerService.getProviders(patient.mrn)
        .do((providers: Provider[]) => {
          return providers
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
