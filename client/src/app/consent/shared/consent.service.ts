import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";
import {Observable} from "rxjs/Observable";
import {SharePurpose} from "./share-purpose.model";
import {ExceptionService} from "app/shared/exception.service";
import {PageableData} from "app/shared/pageable-data.model";
import {BinaryFile} from "app/shared/binary-file.model";
import {NotificationService} from "app/shared/notification.service";
import {UtilityService} from "app/shared/utility.service";
import {DetailedConsent} from "app/consent/shared/detailed-consent.model";
import {Consent} from "app/consent/shared/consent.model";

@Injectable()
export class ConsentService {
  private pcmPurposeOfUseUrl: string = this.apiUrlService.getPcmBaseUrl().concat("/purposes");
  private pepSegmentDocumentUrl: string = this.apiUrlService.getPepUrl().concat("/segmentDocument");

  constructor(private http: Http,
              private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  public getConsents(patientMrn: string, page: number, size: number): Observable<PageableData<DetailedConsent>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    params.set('size', size.toString());
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/");
    return this.http.get(resourceUrl, {search: params})
      .map((resp: Response) => <PageableData<DetailedConsent>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public createConsent(patientMrn: string, consent: Consent): Observable<void> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/");
    return this.http.post(resourceUrl, consent)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  public deleteConsent(patientMrn: string, id: number): Observable<void> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + id);
    return this.http.delete(resourceUrl)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  public getSavedConsentPdf(patientMrn: string, id: number): Observable<BinaryFile> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + id);
    const format: string = "pdf";
    return this.getConsentAsBinaryFile(resourceUrl, format);
  }

  getSignedConsentPdf(patientMrn: string, id: number): Observable<BinaryFile> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + id + "/attestation");
    const format: string = "pdf";
    return this.getConsentAsBinaryFile(resourceUrl, format);
  }

  getRevokedConsentPdf(patientMrn: string, id: number): Observable<BinaryFile> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + id + "/revocation");
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

  public handleDownloadSuccess(pdf: BinaryFile, consentId: number, consentOptionsDialog: any, namePrefix: string, message: string) {
    consentOptionsDialog.close();
    this.utilityService.downloadFile(pdf.content, `${namePrefix}_${consentId}.pdf`, pdf.contentType);
    this.notificationService.show(message);
  }

  public handleDownloadError(err: string) {
    this.notificationService.show(err);
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
