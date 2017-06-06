import {Component, Input, OnInit} from "@angular/core";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";
import {NotificationService} from "app/shared/notification.service";
import {ProviderService} from "../shared/provider.service";
import {UtilityService} from "app/shared/utility.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'c2s-provider-multi-add',
  templateUrl: './provider-multi-add.component.html',
  styleUrls: ['./provider-multi-add.component.scss']
})
export class ProviderMultiAddComponent implements OnInit {
  @Input() providers: FlattenedSmallProvider[];
  private currentProvider: FlattenedSmallProvider = null;
  private patientMrn: string;

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private providerService: ProviderService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientMrn = params['patientMrn'];
    });
  }

  public confirmAddProviders(dialog: any, selectedProviders: FlattenedSmallProvider[]) {
    dialog.close();
    if (selectedProviders != null) {
      const PROVIDER_LIST_URL = "patients";
      this.providerService.addProviders(this.patientMrn, selectedProviders)
        .subscribe(
          () => {
            this.utilityService.navigateTo(PROVIDER_LIST_URL);
          },
          err => {
            this.notificationService.show("Failed to add the provider, please try again later...");
            console.log(err);
          }
        );
    }
  }

  public confirmDeleteProvider(dialog: any, provider: FlattenedSmallProvider) {
    dialog.close();
    if (provider != name) {
      this.currentProvider = provider;
      this.providers.splice(this.providers.indexOf(this.currentProvider), 1);
    }
  }
}
