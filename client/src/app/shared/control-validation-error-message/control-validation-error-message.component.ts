import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {ValidationService} from "app/shared/validation.service";
import {FlattenedSmallProvider} from "../flattened-small-provider.model";

@Component({
  selector: 'c2s-control-validation-error-message',
  templateUrl: './control-validation-error-message.component.html',
  styleUrls: ['./control-validation-error-message.component.scss']
})
export class ControlValidationErrorMessageComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() customMessage: string;

  constructor(private validationService: ValidationService) {
  }

  ngOnInit() {
  }

  get errorMessage() {
    for (const validatorKey in this.control.errors) {
      if (this.control.hasError(validatorKey) && (this.control.dirty || this.control.touched)) {
        return this.validationService.getValidatorErrorMessage(validatorKey, this.control.errors[validatorKey], this.customMessage);
      }
    }
    return null;
  }
}
