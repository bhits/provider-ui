import {Injectable} from "@angular/core";
import {ValidationRules} from "app/shared/validation-rules.model";

@Injectable()
export class ValidationService {

  constructor() {
  }

  public getValidatorErrorMessage(validatorKey: string, validatorValue?: any, customMessage?: string): string {
    switch (validatorKey) {
      case ValidationRules.REQUIRED_KEY:
        return ValidationRules.REQUIRED_MESSAGE;
      case ValidationRules.REQUIRED_TRUE_KEY:
        return ValidationRules.REQUIRED_TRUE_MESSAGE;
      case ValidationRules.EMAIL_KEY:
        return ValidationRules.EMAIL_MESSAGE;
      case ValidationRules.MIN_LENGTH_KEY:
        return `Minimum length ${validatorValue.requiredLength}`;
      case ValidationRules.MAX_LENGTH_KEY:
        return `Maximum length ${validatorValue.requiredLength}`;
      case ValidationRules.PATTERN_KEY:
        return customMessage;
      case ValidationRules.INVALID_PAST_DATE_KEY:
        return ValidationRules.INVALID_PAST_DATE_MESSAGE;
    }
  }

  static pastDateValidator(control) {
    const today = new Date();
    if (control.value < today) {
      return null;
    } else {
      return {'invalidPastDate': true};
    }
  }
}
