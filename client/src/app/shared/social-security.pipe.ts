import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'socialSecurity'
})
export class SocialSecurityPipe implements PipeTransform {

  transform(value: any, mask?: boolean): any {

    if(value){
      let inputValue = value.toString().replace(/\D/g, "");
      let inputValueLenght = inputValue.length;
      if(inputValueLenght < 4){
        return inputValue
      }else if( 3 < inputValueLenght &&  inputValueLenght < 6){
        if(mask){
          return "***-".concat(inputValue.substr(3));
        }else {
          return inputValue.substr(0, 3).concat(inputValue.substr(3)) ;
        }
      }else if (inputValueLenght > 5 ){
        if(mask){
          return "***-**-".concat(inputValue.substr(5, 4));
        }else {
          return inputValue.substr(0, 3).concat("-")
                  .concat(inputValue.substr(3, 2)).concat("-")
                  .concat(inputValue.substr(5, 4));
        }
      }
    }
    return value;
  }

  parse(value:string){
    return value;
  }

}
