import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GlobalEventManagementService {
  private showHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showHeaderEmitter: Observable<boolean> = this.showHeader.asObservable();

  constructor() {
  }

  setShowHeader(show: boolean) {
    this.showHeader.next(show);
  }

  getShowHeaderEmitter(): Observable<boolean> {
    return this.showHeaderEmitter;
  }
}
