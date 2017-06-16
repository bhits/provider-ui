import {AbstractControl} from "@angular/forms/src/model";

export class NpiValidation {

  constructor() { }

  static compareNpis(control: AbstractControl) {
    const intermediaryNpi = control.get('intermediaryNpi');
    const recipientNpi = control.get('recipientNpi');
    if (!intermediaryNpi || !recipientNpi) {
      return null;
    }else if(intermediaryNpi.value === recipientNpi.value ){
      control.get('recipientNpi').setErrors( { npisMatch: true } )
    }
  }
}
