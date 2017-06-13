import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Profile} from "./profile.model";

@Injectable()
export class GlobalEventManagementService {
  private showHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showHeaderEmitter: Observable<boolean> = this.showHeader.asObservable();

  private userProfileSudject: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
  public userProfileEmitter: Observable<Profile> = this.userProfileSudject.asObservable();

  constructor() {
  }

  setShowHeader(show: boolean) {
    this.showHeader.next(show);
  }

  getShowHeaderEmitter(): Observable<boolean> {
    return this.showHeaderEmitter;
  }

  setProfile(profile: Profile){
    this.userProfileSudject.next(profile);
  }

}
