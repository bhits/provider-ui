export enum AccountStatus {
  NotActivated,
  Verified,
  Activated,
  Disabled
}

export const ACCOUNT_STATUSES: Map<AccountStatus, string> = new Map(
  [
    [AccountStatus.NotActivated, "Account Not Yet Activated"],
    [AccountStatus.Verified, "Activation Email Sent"],
    [AccountStatus.Activated, "Account Activated"],
    [AccountStatus.Disabled, "Account Disabled"]
  ]
);
