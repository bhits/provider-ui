import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";
import {Observable} from "rxjs/Observable";
import {SharePurpose} from "./share-purpose.model";
import {ExceptionService} from "app/shared/exception.service";

@Injectable()
export class ConsentService {
  private pcmPurposeOfUseUrl: string = this.apiUrlService.getPcmBaseUrl().concat("/purposes");
  private pepSegmentDocumentUrl: string = this.apiUrlService.getPepUrl().concat("/segmentDocument");

  constructor(private http: Http,
              private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService) { }

  getPepSegmentationDocumentUrl(): string{
    return this.pepSegmentDocumentUrl;
  }

  getPurposeOfUses(): Observable<SharePurpose[]> {
    return this.http.get(this.pcmPurposeOfUseUrl)
      .map((resp: Response) => <SharePurpose[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getProviderByNpi(npi:number){

  }
}
