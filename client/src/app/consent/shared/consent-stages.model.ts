import {ConsentStage} from "./consent-stage.model";
import {ConsentStageOptionKey} from "./consent-stage-option-key.enum";

export const CONSENT_STAGES: ConsentStage[] = [
  {
    consentStage: "SAVED",
    text: "IN PROGRESS",
    icon: "edit",
    color: "accent",
    options: [
      {
        key: ConsentStageOptionKey.EDIT,
        icon: "edit",
        text: "Edit This Consent",
        routerLink: '/consent-create-edit'
      },
      {
        key: ConsentStageOptionKey.DOWNLOAD_SAVED_PDF,
        icon: "search",
        text: "Preview This Consent",
        isMethod: true
      },
      {
        key: ConsentStageOptionKey.DELETE,
        icon: "delete_forever",
        text: "Delete This Consent",
        isMethod: true
      }]
  },
  {
    consentStage: "SIGNED",
    text: "SIGNED",
    icon: "check_circle",
    color: "primary",
    options: [
      {
        key: ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF,
        icon: "file_download",
        text: "View Signed Consent",
        isMethod: true
      }
    ]
  },
  {
    consentStage: "REVOKED",
    text: "REVOKED",
    icon: "cancel",
    color: "warn",
    options: [
      {
        key: ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF,
        icon: "file_download",
        text: "View Signed Consent",
        isMethod: true
      },
      {
        key: ConsentStageOptionKey.DOWNLOAD_REVOKED_PDF,
        icon: "file_download",
        text: "View Signed Revocation",
        isMethod: true
      }
    ]
  }];
