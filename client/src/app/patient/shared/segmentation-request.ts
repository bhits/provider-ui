export class SegmentationRequest {
  recipientNpi : string;
  intermediaryNpi : string;
  purposeOfUse : string;
  patientIdRoot : string;
  patientIdExtension : string;
  documentEncoding : string = "UTF-8";
}
