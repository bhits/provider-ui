import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";
import {Observable} from "rxjs/Observable";
import {SharePurpose} from "./share-purpose.model";
import {ExceptionService} from "app/shared/exception.service";
import {Consent} from "app/consent/shared/consent.model";
import {PageableData} from "app/shared/pageable-data.model";
import {BinaryFile} from "app/shared/binary-file.model";

@Injectable()
export class ConsentService {
  private pcmPurposeOfUseUrl: string = this.apiUrlService.getPcmBaseUrl().concat("/purposes");
  private pepSegmentDocumentUrl: string = this.apiUrlService.getPepUrl().concat("/segmentDocument");

  constructor(private http: Http,
              private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService) {
  }

  public getConsents(patientMrn: string, page: number): Observable<PageableData<Consent>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    const resourceUrl = this.apiUrlService.getPcmBaseUrl().concat("/patients/").concat(patientMrn).concat("/consents");
    return this.http.get(resourceUrl, {search: params})
      .map((resp: Response) => <PageableData<Consent>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public deleteConsent(patientMrn: string, id: number): Observable<void> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl().concat("/patients/").concat(patientMrn).concat("/consents").concat("/" + id);
    return this.http.delete(resourceUrl)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  public getSavedConsentPdf(patientMrn: string, id: number): Observable<BinaryFile> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl().concat("/patients/").concat(patientMrn).concat("/consents").concat("/" + id);
    const format: string = "pdf";
    return this.getConsentAsBinaryFile(resourceUrl, format);
  }

  public getConsentAsBinaryFile(url: string, format: string): Observable<BinaryFile> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('format', format);
    return this.http.get(url, {search: params})
      .map((resp: Response) => <BinaryFile>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getPepSegmentationDocumentUrl(): string {
    return this.pepSegmentDocumentUrl;
  }

  public getPurposeOfUses(): Observable<SharePurpose[]> {
    return this.http.get(this.pcmPurposeOfUseUrl)
      .map((resp: Response) => <SharePurpose[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
