import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ExceptionService {

  constructor() {
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public handleErrorWithErrorCode(error: Response | any){
    let errCode: string;
    if (error instanceof Response) {
      errCode = `${error.status}`;
    }else {
      errCode = error.message ? error.message : error.toString();
    }
    return Observable.throw(errCode);
  }

}
