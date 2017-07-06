import {Component, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'c2s-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public title: string;
  public message: string;
  public okLabel: string = "SHARED.CONFIRM_DIALOG.OK_BTN";
  public cancelLabel: string = "SHARED.CONFIRM_DIALOG.CANCEL_BTN";

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit() {
  }
}
