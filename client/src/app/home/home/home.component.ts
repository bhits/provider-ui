import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {ConfigService} from "../../core/config.service";
import {ProfileService} from "../../security/shared/profile.service";

import {Md2Dialog, Md2DialogConfig} from "md2/dialog/dialog";
import {SessionStorageService} from "../../security/shared/session-storage.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {SessionStorageKey} from "../../core/provider-constant";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public isProviderListCardEnabled: boolean;
  public providerFullName: string;
  @ViewChild('warningDialog') warningDialog: Md2Dialog;
  public disabled : boolean =false;

  constructor(private configService: ConfigService,
              private sessionStorageService: SessionStorageService,
              private authenticationService: AuthenticationService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    if(this.configService.getConfigInSessionStorage().features.demoDisclaimerEnabled){
      if(!this.sessionStorageService.retrieve(SessionStorageKey.TERMS_OF_USE_AGREEMENT)){
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
    this.sessionStorageService.store(SessionStorageKey.TERMS_OF_USE_AGREEMENT,true);
  }

  public logout(dialog: any): void {
    dialog.close();
    this.authenticationService.logout();
  }

}
