import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProviderPermissions} from "app/core/provider-permissions.model";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private providerPermissions: ProviderPermissions;
  private isProviderListCardEnabled: boolean;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.providerPermissions = this.route.snapshot.data['providerPermissions'];
    this.isProviderListCardEnabled = this.providerPermissions.patientListCardEnabled;
  }
}
