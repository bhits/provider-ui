import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Provider} from "../shared/provider.model";
import {NotificationService} from "../../shared/notification.service";
import {ProviderService} from "../shared/provider.service";
import {Patient} from "../../patient/shared/patient.model";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../security/shared/token.service";

@Component({
  selector: 'c2s-provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.scss']
})
export class ProviderCardComponent implements OnInit {
  @Input()
  public provider: Provider;
  @Output()
  public deleteProvider = new EventEmitter<number>();
  public selectedPatient: Patient;
  private selectedProvider: Provider;

  constructor(private notificationService: NotificationService,
              private providerService: ProviderService,
              private tokenService: TokenService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedPatient = this.route.snapshot.data['patient'];
  }

  public openConfirmDialog(dialog: any) {
    dialog.open();
    this.selectedProvider = this.provider;
  }

  public confirmDeleteProvider(dialog: any) {
    dialog.close();
    if (this.selectedProvider != null) {
      this.providerService.deleteProvider(this.selectedPatient.mrn, this.selectedProvider.id)
        .subscribe(
          () => {
            this.deleteProvider.emit(this.provider.id);
            this.tokenService.storeProviderCount(this.tokenService.getProviderCount() - 1);
            this.notificationService.i18nShow("PROVIDER.NOTIFICATION_MSG.SUCCESS_DELETE_PROVIDER");
          },
          err => {
            this.notificationService.i18nShow("PROVIDER.NOTIFICATION_MSG.FAILED_DELETE_PROVIDER");
            console.log(err);
          });
    }
  }
}
