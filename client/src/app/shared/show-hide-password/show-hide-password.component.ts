import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  selector: 'c2s-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss']
})
export class ShowHidePasswordComponent implements OnInit {
  public inputType: string = "password";
  @Output() setInputType = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  public showHidePassword(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
    this.setInputType.emit(this.inputType);
  }
}
