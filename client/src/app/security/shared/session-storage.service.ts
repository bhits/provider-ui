import {Injectable} from "@angular/core";

@Injectable()
export class SessionStorageService {

  constructor() {
  }

  store(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  retrieve(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  clear(key: string): void {
    sessionStorage.removeItem(key);
  }
}
