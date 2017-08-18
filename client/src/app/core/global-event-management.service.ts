import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GlobalEventManagementService {
  private showHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showHeaderEmitter: Observable<boolean> = this.showHeader.asObservable();

  constructor() {
  }

  public setShowHeader(show: boolean): void {
    this.showHeader.next(show);
  }

  public getShowHeaderEmitter(): Observable<boolean> {
    return this.showHeaderEmitter;
  }
}
