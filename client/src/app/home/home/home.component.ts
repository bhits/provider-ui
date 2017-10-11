import {Component, OnInit, ViewChild} from "@angular/core";
import {ConfigService} from "../../core/config.service";
import {ProfileService} from "../../security/shared/profile.service";

import {Md2Dialog, Md2DialogConfig} from "md2/dialog/dialog";
import {SessionStorageService} from "../../security/shared/session-storage.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isProviderListCardEnabled: boolean;
  public providerFullName: string;
  @ViewChild('warningDialog') warningDialog: Md2Dialog;
  public disabled : boolean =false;
  private readonly DEMO_DISCLAIMER_DISABLED: string = 'demoDisclaimerDisabled';

  constructor(private configService: ConfigService,
              private sessionStorageService: SessionStorageService,
              private authenticationService: AuthenticationService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    if(this.configService.getConfigInSessionStorage().features.demoDisclaimerEnabled){
      if(!this.sessionStorageService.retrieve(this.DEMO_DISCLAIMER_DISABLED)){
        let config = new Md2DialogConfig();
        config.disableClose = true;
        this.warningDialog.open(config);
      }
    }
    this.isProviderListCardEnabled = this.configService.getConfigInSessionStorage().providerPermissions.patientListCardEnabled;
    this.providerFullName = this.profileService.getFullName();
  }

  public continue(dialog: any): void {
    dialog.close();
    this.sessionStorageService.store(this.DEMO_DISCLAIMER_DISABLED,true);
  }

  public logout(dialog: any): void {
    dialog.close();
    this.authenticationService.logout();
  }

}
