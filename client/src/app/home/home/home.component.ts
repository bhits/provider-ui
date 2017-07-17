import {Component, OnInit} from "@angular/core";
import {ConfigService} from "../../core/config.service";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private isProviderListCardEnabled: boolean;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.isProviderListCardEnabled = this.configService.getConfigInSessionStorage().providerPermissions.patientListCardEnabled;
  }
}
