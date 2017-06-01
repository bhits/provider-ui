import {Injectable, ViewContainerRef} from "@angular/core";
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {ConfirmDialogComponent} from "app/shared/confirm-dialog/confirm-dialog.component";

@Injectable()
export class ConfirmDialogService {

  constructor(private dialog: MdDialog) {
  }

  public confirm(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ConfirmDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
