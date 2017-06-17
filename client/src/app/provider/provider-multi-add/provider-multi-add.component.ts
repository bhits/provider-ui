import {Component, Input, OnInit} from "@angular/core";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";
import {NotificationService} from "app/shared/notification.service";
import {ProviderService} from "../shared/provider.service";
import {UtilityService} from "app/shared/utility.service";
import {ActivatedRoute} from "@angular/router";
import {Patient} from "app/patient/shared/patient.model";

@Component({
  selector: 'c2s-provider-multi-add',
  templateUrl: './provider-multi-add.component.html',
  styleUrls: ['./provider-multi-add.component.scss']
})
export class ProviderMultiAddComponent implements OnInit {
  @Input() providers: FlattenedSmallProvider[];
  private currentProvider: FlattenedSmallProvider = null;
  private selectedPatient: Patient;

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private providerService: ProviderService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.selectedPatient = this.route.snapshot.parent.data['patient'];
  }

  public confirmAddProviders(dialog: any, selectedProviders: FlattenedSmallProvider[]) {
    dialog.close();
    if (selectedProviders != null) {
      const PROVIDER_LIST_URL: string = "/patients".concat("/" + this.selectedPatient.id);
      this.providerService.addProviders(this.selectedPatient.mrn, selectedProviders)
        .subscribe(
          () => {
            this.utilityService.navigateTo(PROVIDER_LIST_URL);
          },
          err => {
            this.notificationService.i18nShow("PROVIDER.NOTIFICATION_MSG.FAILED_ADD_PROVIDER");
            console.log(err);
          }
        );
    }
  }

  public toOpenDeleteProvider(dialog: any, provider: FlattenedSmallProvider) {
    dialog.open();
    if (provider != null) {
      this.currentProvider = provider;
    }
  }

  public confirmDeleteProvider(dialog: any) {
    dialog.close();
    if (this.currentProvider != null) {
      this.providers.splice(this.providers.indexOf(this.currentProvider), 1);
    }
  }
}
