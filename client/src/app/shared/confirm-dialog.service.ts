import {Injectable, ViewContainerRef} from "@angular/core";
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {ConfirmDialogComponent} from "app/shared/confirm-dialog/confirm-dialog.component";
import {ConfirmDialogOptions} from "./confirm-dialog-options.model";

@Injectable()
export class ConfirmDialogService {

  constructor(private dialog: MdDialog) {
  }

  public confirm(title: string, message: string,
                 viewContainerRef: ViewContainerRef,
                 confirmDialogOptions?: ConfirmDialogOptions): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ConfirmDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    if(confirmDialogOptions && confirmDialogOptions.okLabel){
      dialogRef.componentInstance.okLabel = confirmDialogOptions.okLabel;
    }
    if(confirmDialogOptions && confirmDialogOptions.cancelLabel){
      dialogRef.componentInstance.cancelLabel = confirmDialogOptions.cancelLabel;
    }

    return dialogRef.afterClosed();
  }
}
