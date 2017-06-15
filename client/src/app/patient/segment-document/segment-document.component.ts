import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadOutput, UploadInput, UploadFile, humanizeBytes} from 'ngx-uploader';
import {Subject} from "rxjs/Subject";

import {TokenService} from "../../security/shared/token.service";
import {SharePurpose} from "app/consent/shared/share-purpose.model";
import {UploadOutputType} from "../../consent/shared/upload-output-type.enum";
import {SegmentationRequest} from "../shared/segmentation-request";
import {ConsentService} from "../../consent/shared/consent.service";
import {UtilityService} from "app/shared/utility.service";
import {Patient} from "app/patient/shared/patient.model";
import {ProviderService} from "../../provider/shared/provider.service";
import {Provider} from "../../provider/shared/provider.model";
import {NotificationService} from "../../shared/notification.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";


@Component({
  selector: 'c2s-segment-document',
  templateUrl: './segment-document.component.html',
  styleUrls: ['./segment-document.component.scss']
})
export class SegmentDocumentComponent implements OnInit {

  public segmentationFrom: FormGroup;
  public files: UploadFile[];
  public uploadInput: EventEmitter<UploadInput>;
  public humanizeBytes: Function;
  public segmentedDocument : any;
  public segmentedDocumentName : string;
  public purposeOfUses: SharePurpose[]=[] ;

  public authorizeProvider: FlattenedSmallProvider;
  public discloseProvider: FlattenedSmallProvider;

  private authorizeProviderSubject = new Subject<string>();
  private discloseProviderSubject = new Subject<string>();


  constructor( private formBuilder: FormBuilder,
               private consentService: ConsentService,
               private tokenService: TokenService,
               private providerService: ProviderService,
               private notificationService: NotificationService,
               private utilityService: UtilityService) {
    // local uploading files array
    this.files = [];
    // input events, we use this to emit data to ngx-uploader
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.segmentationFrom = this.buildSegementationForm();
    this.consentService.getPurposeOfUses()
      .subscribe((purposeOfUses: SharePurpose[])=>this.purposeOfUses = purposeOfUses, this.handleSegmentationError);

    this.authorizeProviderSubject
              .switchMap(npi => this.providerService.getProviderByNpi(npi))
                        .subscribe(
                          (provider) => {
                            if (provider) {
                              this.authorizeProvider = provider;
                            }else {
                              this.authorizeProvider = null;
                            }
                          },
                          err => {
                            this.authorizeProvider = null;
                            this.notificationService.show("Failed to search provider, please try again later...");
                          });

    this.discloseProviderSubject
            .switchMap(npi => this.providerService.getProviderByNpi(npi))
                        .subscribe(
                          (provider) => {
                            if (provider) {
                              this.discloseProvider = provider;
                            }else {
                              this.discloseProvider = null;
                            }
                          },
                          err => {
                            this.discloseProvider = null;
                            this.notificationService.show("Failed to search provider, please try again later...");
                          });
  }

  public searchAuthorizeProviders(npi: string): void {
    this.authorizeProviderSubject.next(npi);
  }

  public searchDiscloseProviders(npi: string): void {
    this.discloseProviderSubject.next(npi);
  }

  handleSegmentationError(error: any){
    console.log(error);
  }

  private buildSegementationForm(): FormGroup{
    return this.formBuilder.group({
      intermediaryNpi: [null,
        [ Validators.required]
      ],
      recipientNpi: [null,
        [ Validators.required]
      ],
      purposeOfUse: [null,
        [ Validators.required]
      ],
      document: [null,
        [ Validators.required]
      ],
    });
  }

  onUploadOutput(output: UploadOutput, segmentDocumentDialog: any): void {
    if (output.type === UploadOutputType.ADDED_TO_QUEUE.toString()) {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === UploadOutputType.UPLOADING.toString()) {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === UploadOutputType.REMOVED.toString()) {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === UploadOutputType.DONE.toString()) {
      // Handle download of filed
      if(output && output.file && output.file.response && output.file.response.document){
        this.segmentedDocumentName = output.file.name;
        this.segmentedDocument = output.file.response.document;
        segmentDocumentDialog.open();
      }else{
       console.log("Missing segmented document");
      }
    }
  }

  canSegment():boolean{
    return false;
  }

  segmentDocument(): void {
    const formModel = this.segmentationFrom.value;
    this.uploadInput.emit(this.prepareUploadInputObject(formModel));
  }

  private prepareSegmentationRequestObject(formContro: any):any{
    let segmentationRequest: SegmentationRequest = new SegmentationRequest();
    segmentationRequest.recipientNpi = formContro.recipientNpi;
    segmentationRequest.intermediaryNpi = formContro.intermediaryNpi;
    segmentationRequest.purposeOfUse = formContro.purposeOfUse;
    segmentationRequest.patientIdRoot = "";
    segmentationRequest.patientIdExtension = "";
    return segmentationRequest;
  }

  private prepareUploadInputObject(formModel:any): UploadInput{
    let uploadInput: UploadInput = {
      type: 'uploadAll',
      fieldName: 'file',
      url: this.consentService.getPepSegmentationDocumentUrl(),
      method: 'POST',
      data: this.prepareSegmentationRequestObject(formModel),
      concurrency: 1, // set sequential uploading of files with concurrency 1
      headers: this.tokenService.createAuthorizationHeaderObject()
    };
    return uploadInput;
  }

  downloadSegementedDocument(segmentDocumentDialog: any){
    let filename = "segmented-".concat(this.segmentedDocumentName);
    let documentFormat = "text/xml";
    this.utilityService.downloadFile(this.segmentedDocument,filename,documentFormat );
    segmentDocumentDialog.close();
  }

  closeDialog(segmentDocumentDialog: any){
    segmentDocumentDialog.close();
  }

}
