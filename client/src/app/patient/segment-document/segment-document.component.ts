import {Component, EventEmitter, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {humanizeBytes, UploadFile, UploadInput, UploadOutput} from "ngx-uploader";

import {TokenService} from "../../security/shared/token.service";
import {SharePurpose} from "app/consent/shared/share-purpose.model";
import {UploadOutputType} from "../../consent/shared/upload-output-type.enum";
import {SegmentationRequest} from "../shared/segmentation-request";
import {ConsentService} from "../../consent/shared/consent.service";
import {UtilityService} from "app/shared/utility.service";
import {ProviderService} from "../../provider/shared/provider.service";
import {NotificationService} from "../../shared/notification.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";
import {ValidationService} from "../../shared/validation.service";
import {ValidationRules} from "../../shared/validation-rules.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {NpiValidation} from "../../shared/npi-validation";
import {Patient} from "../shared/patient.model";
import {PatientService} from "../shared/patient.service";
import {SegmentedDocumentReponse} from "../shared/segmented-document-response";


@Component({
  selector: 'c2s-segment-document',
  templateUrl: './segment-document.component.html',
  styleUrls: ['./segment-document.component.scss']
})
export class SegmentDocumentComponent implements OnInit {

  @Input() patient: Patient;
  public segmentationFrom: FormGroup;
  public files: UploadFile[];
  public uploadInput: EventEmitter<UploadInput>;
  public humanizeBytes: Function;
  public segmentedDocument: SegmentedDocumentReponse;
  public segmentedDocumentName: string;
  public purposeOfUses: SharePurpose[] = [];

  public authorizeProvider: FlattenedSmallProvider;
  public discloseProvider: FlattenedSmallProvider;

  public numberErrorMessage: string = ValidationRules.NUMBER_MESSAGE;
  public invalidFile: boolean = false;

  public authorizeProviderSubject: BehaviorSubject<FlattenedSmallProvider> = new BehaviorSubject<FlattenedSmallProvider>(null);
  public authorizeProviderEmitter: Observable<FlattenedSmallProvider> = this.authorizeProviderSubject.asObservable();

  public discloseProviderSubject: BehaviorSubject<FlattenedSmallProvider> = new BehaviorSubject<FlattenedSmallProvider>(null);
  public discloseProviderEmitter: Observable<FlattenedSmallProvider> = this.discloseProviderSubject.asObservable();


  constructor(private formBuilder: FormBuilder,
              private consentService: ConsentService,
              private tokenService: TokenService,
              private providerService: ProviderService,
              private notificationService: NotificationService,
              private patientService: PatientService,
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
      .subscribe((purposeOfUses: SharePurpose[]) => this.purposeOfUses = purposeOfUses, this.handleSegmentationError);


    this.authorizeProviderEmitter.subscribe((provider) => {
      if (provider !== null) {
        this.authorizeProvider = provider;
      } else {
        this.authorizeProvider = null;
      }
    });

    this.discloseProviderEmitter.subscribe((provider) => {
      if (provider !== null) {
        this.discloseProvider = provider;
      } else {
        this.discloseProvider = null;
      }
    });
  }

  public searchAuthorizeProviders(npi: string): void {
    this.providerService.getProviderByNpi(npi)
      .subscribe((provider) => {
          if (provider) {
            this.authorizeProviderSubject.next(provider)
          } else {
            this.authorizeProviderSubject.next(null);
          }
        },
        err => {
          this.authorizeProviderSubject.next(null);
          this.notificationService.i18nShow("PATIENT.SEGMENT_DOCUMENT.GET_PROVIDER_NOTIFICATION_MSG");
        }
      );

  }

  public searchDiscloseProviders(npi: string): void {
    this.providerService.getProviderByNpi(npi)
      .subscribe((provider) => {
          if (provider) {
            this.discloseProviderSubject.next(provider);
          } else {
            this.discloseProviderSubject.next(null);
          }
        },
        err => {
          this.discloseProviderSubject.next(null);
          this.notificationService.i18nShow("PATIENT.SEGMENT_DOCUMENT.GET_PROVIDER_NOTIFICATION_MSG");
        }
      );
  }

  handleSegmentationError(error: any) {
    console.log(error);
  }

  private buildSegementationForm(): FormGroup {
    return this.formBuilder.group(
      {
        intermediaryNpi: [null, Validators.compose([Validators.required, ValidationService.isANumberValidator])],
        recipientNpi: [null, Validators.compose([Validators.required, ValidationService.isANumberValidator])],
        purposeOfUse: [null, [Validators.required]],
        document: [null]
      },
      {validator: Validators.compose([NpiValidation.compareNpis])}
    );
  }

  validateFile(event: any) {
    let files: any = event.srcElement.files;
    if (files && files[0]) {
      this.invalidFile = !ValidationService.isXmlFile(files[0]);
    }
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
      if (output && output.file && output.file.response && output.file.response.segmentedDocument) {
        this.segmentedDocumentName = output.file.name;
        this.segmentedDocument = output.file.response.segmentedDocument;
        segmentDocumentDialog.open();
      } else {
        this.notificationService.i18nShow("PATIENT.SEGMENT_DOCUMENT.DOCUMENT_NOT_FOUND_NOTIFICATION_MSG");
        console.log("Missing segmented document");
      }
    }
  }

  segmentDocument(): void {
    const formModel = this.segmentationFrom.value;
    this.uploadInput.emit(this.prepareUploadInputObject(formModel));
  }

  private prepareSegmentationRequestObject(formControl: any): any {

    let patientIds = this.getPatientIds();
    let segmentationRequest: SegmentationRequest = new SegmentationRequest();
    segmentationRequest.recipientNpi = formControl.recipientNpi;
    segmentationRequest.intermediaryNpi = formControl.intermediaryNpi;
    segmentationRequest.purposeOfUse = formControl.purposeOfUse;
    segmentationRequest.patientIdRoot = patientIds.root;
    segmentationRequest.patientIdExtension = patientIds.extension;
    return segmentationRequest;
  }

  private getPatientIds() {
    let patientIdRoot = null;
    let patientIdExtension = null;
    let result = {
      root: "",
      extension: ""
    };

    this.patient.identifiers.forEach(id => {
      if (id.system === this.patientService.getDefaultPatientIdentifierSystem()) {
        result.root = id.system;
        result.extension = id.value;

      }
    });
    return result;
  }

  private prepareUploadInputObject(formModel: any): UploadInput {
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

  downloadSegementedDocument(segmentDocumentDialog: any) {
    let filename = "segmented-".concat(this.segmentedDocumentName);
    let documentFormat = "text/xml";
    this.utilityService.downloadFile(this.segmentedDocument, filename, documentFormat);
    segmentDocumentDialog.close();
  }

  closeDialog(segmentDocumentDialog: any) {
    segmentDocumentDialog.close();
  }

}
