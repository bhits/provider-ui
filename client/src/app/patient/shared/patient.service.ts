import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "../../shared/exception.service";
import {Patient} from "app/patient/shared/patient.model";
import {Observable} from "rxjs/Observable";
import {ApiUrlService} from "app/shared/api-url.service";
import {PatientActivationResponse} from "app/patient/shared/patient-activation-response.model";
import {PageableData} from "../../shared/pageable-data.model";
import {PatientSearchQuery} from "./patient-search-query.model";
import {NotificationService} from "app/shared/notification.service";

@Injectable()
export class PatientService {
  private umsPatientUrl: string = this.apiUrlService.getUmsBaseUrl().concat("/users");

  private defaultPatientIdentifierSystem: string = "https://bhits.github.io/consent2share";

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private notificationService: NotificationService,
              private http: Http) {
  }

  public getDefaultPatientIdentifierSystem() {
    return this.defaultPatientIdentifierSystem;
  }

  public getPatients(page: number): Observable<PageableData<Patient>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    return this.http.get(this.umsPatientUrl, {search: params})
      .map((resp: Response) => <PageableData<Patient>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  private buildRequestParams(requestParams: PatientSearchQuery): URLSearchParams {

    let params: URLSearchParams = new URLSearchParams();
    const firstName: string = requestParams.strictMatch ? requestParams.firstName : this.addLikePatternInQueryParameter(requestParams.firstName);
    const lastName: string = requestParams.strictMatch ? requestParams.lastName : this.addLikePatternInQueryParameter(requestParams.lastName);
    params.set('firstName', firstName);
    params.set('lastName', lastName);
    params.set('genderCode', requestParams.genderCode);
    params.set('birthDate', requestParams.birthDate);
    params.set('mrn', requestParams.mrn);
    params.set('page', requestParams.page);
    params.set('size', requestParams.size);

    return params;
  }

  private addLikePatternInQueryParameter(requestParam: string): string {
    const LIKE_PATTERN = "%";
    if (requestParam != null && requestParam.length > 0) {
      return LIKE_PATTERN.concat(requestParam, LIKE_PATTERN);
    }
  }

  public searchPatientsByDemographics(requestParams: PatientSearchQuery): Observable<PageableData<Patient>> {
    const SEARCH_PATIENT_BY_DEMOGRAPHICS_URL = this.umsPatientUrl.concat("/search/patientDemographic");
    let params: URLSearchParams = this.buildRequestParams(requestParams);
    return this.http.get(SEARCH_PATIENT_BY_DEMOGRAPHICS_URL, {search: params})
      .map((resp: Response) => <PageableData<Patient>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public createPatient(patient: Patient): Observable<void> {
    const CREATE_PATIENT_URL = this.umsPatientUrl;
    return this.http.post(CREATE_PATIENT_URL, patient)
      .map(() => null)
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  public getPatient(patientId: number): Observable<Patient> {
    const GET_PATIENT_URL = `${this.umsPatientUrl}/${patientId}`;
    return this.http.get(GET_PATIENT_URL)
      .map((resp: Response) => <Patient>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public updatePatient(patientId: number, patient: Patient): Observable<void> {
    const UPDATE_PATIENT_URL = `${this.umsPatientUrl}/${patientId}`;
    return this.http.put(UPDATE_PATIENT_URL, patient)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  public initiatePatientActivation(patientId: number): Observable<PatientActivationResponse> {
    const PATIENT_ACTIVATION_URL = `${this.umsPatientUrl}/${patientId}/activation`;
    return this.http.post(PATIENT_ACTIVATION_URL, {})
      .map((resp: Response) => <PatientActivationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getCurrentPatientCreationInfo(userId: number): Observable<PatientActivationResponse> {
    const PATIENT_ACTIVATION_URL = `${this.umsPatientUrl}/${userId}/activation`;
    return this.http.get(PATIENT_ACTIVATION_URL)
      .map((resp: Response) => <PatientActivationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public disablePatient(patientId: number): Observable<void> {
    const PATIENT_DISABLED_URL = `${this.umsPatientUrl}/${patientId}/disabled`;
    return this.http.put(PATIENT_DISABLED_URL, {})
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  public enablePatient(patientId: number): Observable<void> {
    const PATIENT_DISABLED_URL = `${this.umsPatientUrl}/${patientId}/enabled`;
    return this.http.put(PATIENT_DISABLED_URL, {})
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  handleIdentifierSystemError(err: any){
    if(err == "409"){
      this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.IDENTIFIER_VALUE_DUPLICATE");
    }else{
      this.notificationService.i18nShow("PATIENT.NOTIFICATION_MSG.FAILED_CREATE_PATIENT");
    }
  }
}
