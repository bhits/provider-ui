export class ValidationRules {
  //Declare All Validation Errors Key
  public static REQUIRED_KEY: string = "required";
  public static REQUIRED_TRUE_KEY: string = "requiredTrue";
  public static EMAIL_KEY: string = "email";
  public static MIN_LENGTH_KEY: string = "minlength";
  public static MAX_LENGTH_KEY: string = "maxlength";
  public static PATTERN_KEY: string = "pattern";
  public static INVALID_PAST_DATE_KEY: string = "invalidPastDate";
  public static INVALID_NUMBER_KEY: string = "invalidNumber";
  //Declare Validation Rule
  public static NORMAL_MIN_LENGTH: number = 2;
  public static NORMAL_MAX_LENGTH: number = 50;
  public static NAME_MIN_LENGTH: number = 2;
  public static NAME_MAX_LENGTH: number = 100;
  public static CITY_MAX_LENGTH: number = 30;
  public static TELECOM_MIN_LENGTH: number = 2;
  public static TELECOM_MAX_LENGTH: number = 150;
  public static PASSWORD_MIN_LENGHT: number = 8;
  public static PAASOWRD_MAX_LENGHT: number = 50;
  public static PHONE_PATTERN = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';
  public static ZIP_PATTERN = '^[0-9]{5}(?:-[0-9]{4})?$';
  public static SSN_PATTERN = '^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$';
  //Custom Error Message
  public static PHONE_MESSAGE: string = "SHARED.VALIDATION_RULES.PHONE_ERROR_MESSAGE";
  public static SSN_MESSAGE: string = "SHARED.VALIDATION_RULES.SSN_ERROR_MESSAGE";
  public static ZIP_MESSAGE: string = "SHARED.VALIDATION_RULES.ZIP_ERROR_MESSAGE";
  public static EMAIL_MESSAGE: string = "SHARED.VALIDATION_RULES.EMAIL_ERROR_MESSAGE";
  public static REQUIRED_MESSAGE: string = "SHARED.VALIDATION_RULES.REQUIRED_ERROR_MESSAGE";
  public static REQUIRED_TRUE_MESSAGE: string = "SHARED.VALIDATION_RULES.REQUIRED_TRUE_ERROR_MESSAGE";
  public static INVALID_PAST_DATE_MESSAGE: string = "SHARED.VALIDATION_RULES.INVALID_PAST_DATE_ERROR_MESSAGE";
  public static NUMBER_MESSAGE: string = "Must be a number.";
}
