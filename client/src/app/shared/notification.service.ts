import {Injectable} from "@angular/core";
import {Md2Toast} from "md2";
import {TranslateService} from "@ngx-translate/core/src/translate.service";

@Injectable()
export class NotificationService {
  private duration: number = 4000;

  constructor(private toast: Md2Toast, private translate: TranslateService) {
  }

  show(message: string) {
    this.toast.show(message, this.duration);
  }

  i18nShow(key:string){
    this.translate.get(key).subscribe((res: string) => {
      this.toast.show(res, this.duration);
    });
  }

}
