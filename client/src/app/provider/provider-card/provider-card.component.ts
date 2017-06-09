import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Provider} from "../shared/provider.model";
import {NotificationService} from "../../shared/notification.service";
import {ProviderService} from "../shared/provider.service";
import {Patient} from "../../patient/shared/patient.model";

@Component({
  selector: 'c2s-provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.scss']
})
export class ProviderCardComponent implements OnInit {
  @Input()
  public patient: Patient;
  @Input()
  public provider: Provider;
  @Output()
  public deleteProvider = new EventEmitter<number>();
  private selectedProvider: Provider;

  constructor(private notificationService: NotificationService,
              private providerService: ProviderService) {
  }

  ngOnInit() {
  }

  public openConfirmDialog(dialog: any) {
    dialog.open();
    this.selectedProvider = this.provider;
  }

  public confirmDeleteProvider(dialog: any) {
    dialog.close();
    if (this.selectedProvider != null) {
      this.providerService.deleteProvider(this.patient.mrn, this.selectedProvider.id)
        .subscribe(
          () => {
            this.deleteProvider.emit(this.provider.id);
            this.notificationService.show("Success in deleting provider.");
          },
          err => {
            this.notificationService.show("Failed to delete the provider, please try again later...");
            console.log(err);
          });
    }
  }
}
