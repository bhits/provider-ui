import {Injectable} from "@angular/core";
import {ExceptionService} from "../../shared/exception.service";
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";
import {Observable} from "rxjs/Observable";
import {PatientCreationLookupInfo} from "./patient-creation-lookup-info.model";

@Injectable()
export class PatientCreationLookupService {
  private umsPatientUrl: string = this.apiUrlService.getUmsBaseUrl();

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getPatientCreationLookupInfo(): Observable<PatientCreationLookupInfo> {
    return this.http.get(this.umsPatientUrl.concat("/userCreationLookupInfo"))
      .map((resp: Response) => <PatientCreationLookupInfo>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
