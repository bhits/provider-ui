import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "app/security/shared/authentication.service";

@Component({
  selector: 'c2s-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFrom: FormGroup;
  public passwordInputType: string = "password";
  public unauthorized: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginFrom = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    const formModel = this.loginFrom.value;
    const username: string = formModel.username;
    const password: string = formModel.password;
    this.authenticationService.login(username, password)
      .subscribe(
        (res) => {
          this.unauthorized = false;
          this.authenticationService.isLoggedIn(res);
        },
        err => {
          this.unauthorized = true;
          this.loginFrom.reset();
          console.log(err);
        }
      );
  }

  public getInputType(inputType: string) {
    this.passwordInputType = inputType;
  }
}
