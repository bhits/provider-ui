import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";

@Injectable()
export class ConsentService {

  private pepSegmentDocumentUrl: string = this.apiUrlService.getPepUrl().concat("/segmentDocument");

  constructor(private http: Http,
              private apiUrlService: ApiUrlService) { }

  getPepSegmentationDocumentUrl(): string{
    return this.pepSegmentDocumentUrl;
  }
}
