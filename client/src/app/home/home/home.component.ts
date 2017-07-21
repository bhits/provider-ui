import {Component, OnInit} from "@angular/core";
import {ConfigService} from "../../core/config.service";
import {ProfileService} from "../../security/shared/profile.service";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isProviderListCardEnabled: boolean;
  public providerFullName: string;

  constructor(private configService: ConfigService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.isProviderListCardEnabled = this.configService.getConfigInSessionStorage().providerPermissions.patientListCardEnabled;
    this.providerFullName = this.profileService.getFullName();
  }
}
