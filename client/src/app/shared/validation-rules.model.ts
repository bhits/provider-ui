export class ValidationRules {
  //Declare All Validation Errors Key
  public static REQUIRED_KEY: string = "required";
  public static REQUIRED_TRUE_KEY: string = "requiredTrue";
  public static EMAIL_KEY: string = "email";
  public static MIN_LENGTH_KEY: string = "minlength";
  public static MAX_LENGTH_KEY: string = "maxlength";
  public static PATTERN_KEY: string = "pattern";
  public static INVALID_PAST_DATE_KEY: string = "invalidPastDate";
  public static ONE_EMAIL_REQUIRED_KEY: string = "oneEmailRequired";
  //Declare Validation Rule
  public static NORMAL_MIN_LENGTH: number = 2;
  public static NORMAL_MAX_LENGTH: number = 50;
  public static NAME_MIN_LENGTH: number = 2;
  public static NAME_MAX_LENGTH: number = 30;
  public static PASSWORD_MIN_LENGHT: number = 8;
  public static PAASOWRD_MAX_LENGHT: number = 50;
  public static PHONE_PATTERN = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';
  public static ZIP_PATTERN = '^[0-9]{5}(?:-[0-9]{4})?$';
  public static SSN_PATTERN = '^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$';
  public static EMAIL_PATTERN ='^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$';
  //Custom Error Message
  public static PHONE_MESSAGE: string = "Must be with formats: 123-456-7890 (123)456-7890 1234567890 123.456.7890.";
  public static SSN_MESSAGE: string = "Must be with formats:  123-45-6789, 123456789; 123-456789; 12345-6789";
  public static ZIP_MESSAGE: string = "Must be with formats: 12345 or 12345-6789.";
  public static EMAIL_MESSAGE: string = "This email does not perform email validation.";
  public static REQUIRED_MESSAGE: string = "This field is required.";
  public static REQUIRED_TRUE_MESSAGE: string = "This field value must be true.";
  public static INVALID_PAST_DATE_MESSAGE: string = "Selected date must be earlier than today";
  public static ONE_EMAIL_REQUIRED_MESSAGE: string = "At least one email address needed";
}
