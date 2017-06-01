import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'usPhoneNumber'
})
export class UsPhoneNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value != null) {
      let phoneNumber = value.toString().trim().replace(/^\+/, '');
      let areaCode, digitNumber;

      if (phoneNumber.length == 10) {
        areaCode = phoneNumber.slice(0, 3);
        digitNumber = phoneNumber.slice(3);
      } else {
        return value;
      }
      return (" (" + areaCode + ") " + digitNumber.slice(0, 3) + '-' + digitNumber.slice(3)).trim();
    }
  }
}
