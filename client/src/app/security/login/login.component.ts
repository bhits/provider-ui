import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "app/security/shared/authentication.service";
import {ProfileService} from "../shared/profile.service";
import {UmsProfile} from "../shared/ums-profile.model";
import {Profile} from "../../core/profile.model";
import {UtilityService} from "app/shared/utility.service";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {TokenService} from "../shared/token.service";
import {TranslateService} from "@ngx-translate/core";

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
              private profileService: ProfileService,
              private utilityService: UtilityService,
              private tokenService: TokenService,
              private customTranslateService: CustomTranslateService,
              private formBuilder: FormBuilder,
              private translate: TranslateService) {
    // Set default language for login page
    const DEFAULT_LANGUAGE = "en";
    translate.setDefaultLang(DEFAULT_LANGUAGE);
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
          this.authenticationService.onLoggedIn(res);
          this.authenticationService.getUserProfile()
            .subscribe(
              (uaaProfile) => {
                let profile = this.tokenService.createProfileObject(uaaProfile);
                this.tokenService.storeUserProfile(profile);
                this.getUMSProfileAndSetDefaultLanguage(profile);
              }
              ,
              (error) => this.handleLoginError
            );
        },
        err => {
          this.unauthorized = true;
          this.loginFrom.reset();
          console.log(err);
        }
      );
  }

  getUMSProfileAndSetDefaultLanguage(uaaProfile: Profile) {
    this.profileService.getUMSProfile().subscribe(
      (profile: UmsProfile) => {
        let localesCode: string[] = this.utilityService.getSupportedLocaleCode(profile.supportedLocales);
        this.customTranslateService.addSupportedLanguages(localesCode);
        this.customTranslateService.setDefaultLanguage(profile.userLocale);
        this.profileService.setProfileInSessionStorage(profile);
        this.authenticationService.onGetUserProfileSuccess(uaaProfile);
      },
      this.handleLoginError
    )
  }

  handleLoginError(error: any) {
    this.tokenService.deleteAccessToken();
    this.unauthorized = true;
  }

  public getInputType(inputType: string) {
    this.passwordInputType = inputType;
  }
}
