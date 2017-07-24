import {RoleCodeName} from "../../shared/role-code-name.model";
export class ActivityHistory {
  consentReferenceId: string;
  actionType: string;
  updatedBy: string;
  updatedDateTime: Date;
  role: RoleCodeName;
}
