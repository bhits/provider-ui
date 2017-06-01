import {Injectable} from "@angular/core";
import {Md2Toast} from "md2";

@Injectable()
export class NotificationService {
  private duration: number = 4000;

  constructor(private toast: Md2Toast) {
  }

  show(message: string) {
    this.toast.show(message, this.duration);
  }
}
