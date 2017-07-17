import {Injectable} from "@angular/core";
import {ExceptionService} from "../../shared/exception.service";
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";
import {Observable} from "rxjs/Observable";
import {PatientCreationLookupInfo} from "./patient-creation-lookup-info.model";
import {PatientSearchConfig} from "./patient-search-config.model";

@Injectable()
export class PatientSearchConfigService {
  private umsPatientUrl: string = this.apiUrlService.getUmsBaseUrl();

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getPatientSearchConfig(): Observable<PatientSearchConfig> {
    return this.http.get(this.umsPatientUrl.concat("/userSearchConfig"))
      .map((resp: Response) => <PatientSearchConfig>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
