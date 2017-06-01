import {Injectable} from "@angular/core";
import {ExceptionService} from "../../shared/exception.service";
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";
import {Observable} from "rxjs/Observable";
import {UserCreationLookupInfo} from "./user-creation-lookup-info.model";

@Injectable()
export class UserCreationLookupService {
  private umsUserUrl: string = this.apiUrlService.getUmsBaseUrl();

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getUserCreationLookupInfo(): Observable<UserCreationLookupInfo> {
    return this.http.get(this.umsUserUrl.concat("/userCreationLookupInfo"))
      .map((resp: Response) => <UserCreationLookupInfo>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
