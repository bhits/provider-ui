import {ConsentStage} from "./consent-stage.model";
import {ConsentStageOptionKey} from "./consent-stage-option-key.enum";

export const CONSENT_STAGES: ConsentStage[] = [
  {
    consentStage: "SAVED",
    text: "CONSENT.CARD.CONSENT_STAGES.SAVED_STAGE.STAGE_TEXT",
    icon: "edit",
    color: "accent",
    options: [
      {
        key: ConsentStageOptionKey.EDIT,
        icon: "edit",
        text: "CONSENT.CARD.CONSENT_STAGES.SAVED_STAGE.EDIT_THIS_CONSENT_OPTION_TEXT",
        routerLink: '/consents'
      },
      {
        key: ConsentStageOptionKey.DOWNLOAD_SAVED_PDF,
        icon: "search",
        text: "CONSENT.CARD.CONSENT_STAGES.SAVED_STAGE.PREVIEW_THIS_CONSENT_OPTION_TEXT",
        isMethod: true
      },
      {
        key: ConsentStageOptionKey.SIGN,
        icon: "assignment_turned_in",
        text: "CONSENT.CARD.CONSENT_STAGES.SAVED_STAGE.PROVIDE_ESIGNATURE_OPTION_TEXT",
        routerLink: '/consent-sign'
      },
      {
        key: ConsentStageOptionKey.APPLY_TRY_POLICY,
        icon: "settings",
        text: "CONSENT.CARD.CONSENT_STAGES.SAVED_STAGE.APPLY_TRY_POLICY_OPTION_TEXT",
        isMethod: true
      },
      {
        key: ConsentStageOptionKey.DELETE,
        icon: "delete_forever",
        text: "CONSENT.CARD.CONSENT_STAGES.SAVED_STAGE.DELETE_THIS_CONSENT_OPTION_TEXT",
        isMethod: true
      }]
  },
  {
    consentStage: "SIGNED",
    text: "CONSENT.CARD.CONSENT_STAGES.SIGNED_STAGE.STAGE_TEXT",
    icon: "check_circle",
    color: "primary",
    options: [
      {
        key: ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF,
        icon: "file_download",
        text: "CONSENT.CARD.CONSENT_STAGES.SIGNED_STAGE.VIEW_SIGNED_CONSENT_OPTION_TEXT",
        isMethod: true
      },
      {
        key: ConsentStageOptionKey.REVOKE,
        icon: "cancel",
        text: "CONSENT.CARD.CONSENT_STAGES.SIGNED_STAGE.REVOCATION_OPTION_TEXT",
        routerLink: '/consent-revoke'
      },
      {
        key: ConsentStageOptionKey.APPLY_TRY_POLICY,
        icon: "settings",
        text: "CONSENT.CARD.CONSENT_STAGES.SAVED_STAGE.APPLY_TRY_POLICY_OPTION_TEXT",
        isMethod: true
      }
    ]
  },
  {
    consentStage: "REVOKED",
    text: "CONSENT.CARD.CONSENT_STAGES.REVOKED_STAGE.STAGE_TEXT",
    icon: "cancel",
    color: "warn",
    options: [
      {
        key: ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF,
        icon: "file_download",
        text: "CONSENT.CARD.CONSENT_STAGES.REVOKED_STAGE.VIEW_SIGNED_CONSENT_OPTION_TEXT",
        isMethod: true
      },
      {
        key: ConsentStageOptionKey.DOWNLOAD_REVOKED_PDF,
        icon: "file_download",
        text: "CONSENT.CARD.CONSENT_STAGES.REVOKED_STAGE.VIEW_SIGNED_REVOCATION_OPTION_TEXT",
        isMethod: true
      },
      {
        key: ConsentStageOptionKey.APPLY_TRY_POLICY,
        icon: "settings",
        text: "CONSENT.CARD.CONSENT_STAGES.SAVED_STAGE.APPLY_TRY_POLICY_OPTION_TEXT",
        isMethod: true
      }
    ]
  }];
