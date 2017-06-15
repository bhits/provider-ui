export enum AccountStatus {
  NotActivated,
  Verified,
  Activated,
  Disabled
}

export const ACCOUNT_STATUSES: Map<AccountStatus, string> = new Map(
  [
    [AccountStatus.NotActivated, "PATIENT.VERIFICATION.ACCOUNT_STATUSES.NOT_ACTIVATED_TEXT"],
    [AccountStatus.Verified, "PATIENT.VERIFICATION.ACCOUNT_STATUSES.VERIFIED_TEXT"],
    [AccountStatus.Activated, "PATIENT.VERIFICATION.ACCOUNT_STATUSES.ACTIVATED_TEXT"],
    [AccountStatus.Disabled, "PATIENT.VERIFICATION.ACCOUNT_STATUSES.DISABLED_TEXT"]
  ]
);
