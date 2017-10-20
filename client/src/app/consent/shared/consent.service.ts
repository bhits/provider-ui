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
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Provider} from "app/provider/shared/provider.model";
import {VssSensitivityCategory} from "app/consent/shared/vss-sensitivity-category.model";
import {ConsentTerms} from "./consent-terms.model";
import {ConsentRevocation} from "./consent-revocation.model";
import {ActivityHistory} from "./activity-history.model";
import {Identifier} from "../../shared/identifier.model";
import {ConsentProvider} from "app/shared/consent-provider.model";
import {Identifiers} from "../../shared/identifiers.model";

@Injectable()
export class ConsentService {
  private pcmPurposeOfUseUrl: string = this.apiUrlService.getPcmBaseUrl().concat("/purposes");
  private vssSensitivityCategoriesUrl: string = this.apiUrlService.getVssBaseUrl().concat("/valueSetCategories");
  private pepSegmentDocumentUrl: string = this.apiUrlService.getPepUrl().concat("/access");

  //TODO: Refactor with redux
  private consentSubject: BehaviorSubject<Consent> = new BehaviorSubject<Consent>(null);
  public consentEmitter: Observable<Consent> = this.consentSubject.asObservable();

  constructor(private http: Http,
              private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  public getConsentEmitter(): Observable<Consent> {
    return this.consentEmitter;
  }

  public setConsentEmitter(consent: Consent) {
    this.consentSubject.next(consent);
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

  public getConsent(patientMrn: string, id: number): Observable<Consent> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + id);
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Consent>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getDetailedConsent(patientMrn: string, id: number): Observable<DetailedConsent> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + id);
    const jsonFormat: string = "detailedConsent";
    let params: URLSearchParams = new URLSearchParams();
    params.set('format', jsonFormat);
    return this.http.get(resourceUrl, {search: params})
      .map((resp: Response) => <DetailedConsent>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public createConsent(patientMrn: string, consent: Consent): Observable<void> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/");
    return this.http.post(resourceUrl, consent)
      .map(() => null)
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  public updateConsent(patientMrn: string, consent: Consent): Observable<void> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + consent.id);
    return this.http.put(resourceUrl, consent)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }


  public attestConsent(patientMrn: string, consentId: number): Observable<void> {
    const acceptTerms: boolean = true;
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + consentId + "/attestation");

    return this.http.put(resourceUrl, JSON.stringify({acceptTerms: acceptTerms}))
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  revokeConsent(consentRevocation: ConsentRevocation, patientMrn: string, consentId: number): Observable<void> {
    let resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + consentId + "/revocation");

    return this.http.put(resourceUrl, consentRevocation)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  getConsentAttestationTerm(): Observable<ConsentTerms> {
    const url = this.apiUrlService.getPcmBaseUrl().concat("/consentAttestationTerm");
    return this.http.get(url)
      .map((resp: Response) => <ConsentTerms>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getConsentRevocationTerms() {
    const url = this.apiUrlService.getPcmBaseUrl().concat("/consentRevocationTerm");
    return this.http.get(url)
      .map((resp: Response) => <SharePurpose[]>(resp.json()))
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

  public getSignedConsentPdf(patientMrn: string, id: number): Observable<BinaryFile> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + id + "/attestation");
    const format: string = "pdf";
    return this.getConsentAsBinaryFile(resourceUrl, format);
  }

  public getRevokedConsentPdf(patientMrn: string, id: number): Observable<BinaryFile> {
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consents/" + id + "/revocation");
    const format: string = "pdf";
    return this.getConsentAsBinaryFile(resourceUrl, format);
  }

  private getConsentAsBinaryFile(url: string, format: string): Observable<BinaryFile> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('format', format);
    return this.http.get(url, {search: params})
      .map((resp: Response) => <BinaryFile>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public handleDownloadSuccess(pdf: BinaryFile, consentId: number, consentOptionsDialog: any, namePrefix: string, message: string) {
    consentOptionsDialog.close();
    this.utilityService.downloadFile(pdf.content, `${namePrefix}_${consentId}.pdf`, pdf.contentType);
    this.notificationService.i18nShow(message);
  }

  public handleDownloadError(err: string) {
    this.notificationService.i18nShow(err);
  }

  public getPepSegmentationDocumentUrl(): string {
    return this.pepSegmentDocumentUrl;
  }

  public getPurposeOfUses(): Observable<SharePurpose[]> {
    return this.http.get(this.pcmPurposeOfUseUrl)
      .map((resp: Response) => <SharePurpose[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getSensitivityCategories(): Observable<VssSensitivityCategory[]> {
    return this.http.get(this.vssSensitivityCategoriesUrl)
      .map((resp: Response) => <VssSensitivityCategory[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  handleCreateConsentError(err: any){
    if(err == "409"){
      this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.DUPLICATE_CONSENT");
    }else{
      this.notificationService.i18nShow("CONSENT.NOTIFICATION_MSG.FAILED_CREATING_CONSENT");
    }
  }

  public getActivityHistory(patientMrn: string, page: number, size: number): Observable<PageableData<ActivityHistory>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    params.set('size', size.toString());
    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consent-activities/");
    return this.http.get(resourceUrl, {search: params})
      .map((resp: Response) => <PageableData<ActivityHistory>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  isInList(currentIdentifiers: Identifier[], selectedIdentifiers: Identifier[]): boolean {
    let selected = false;
    selectedIdentifiers.forEach(selectedIdentifier=>{
      currentIdentifiers.forEach(currentIdentifier =>{
        if(currentIdentifier.value === selectedIdentifier.value){
          selected =  true;
        }
      });
    });
    return selected;
  }

  createListOfIdentifiers(providers: ConsentProvider[]) :Identifiers{
    let listOfIdentifiers:Identifiers = new Identifiers([new Identifier(null, null)]);
    let identifies: Identifier[] = [];
    providers.forEach(provider=>{
      if(provider['selected']){
        identifies.push(new Identifier(provider.identifiers[0].system, provider.identifiers[0].value));
      }
    });
    listOfIdentifiers.identifiers = identifies;
    return listOfIdentifiers;
  }

  markSelectedProvidersAsChecked(providers:ConsentProvider[], selectedIdentifiers: Identifier[]){
    providers.forEach(provider => {
      let tempProvider = provider;
      provider.identifiers.forEach(identifier=>{
        selectedIdentifiers.forEach(selectedIdentifier => {
          if(selectedIdentifier.value ===identifier.value){
            provider.selected = true;
          }
        });
      });
    });
  }
}
