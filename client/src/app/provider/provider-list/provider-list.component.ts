import {Component, Input, OnInit} from "@angular/core";
import {PaginationInstance} from "ng2-pagination";
import {NotificationService} from "../../shared/notification.service";
import {ProviderService} from "../shared/provider.service";
import {Patient} from "../../patient/shared/patient.model";
import {Provider} from "app/provider/shared/provider.model";
import {UtilityService} from "../../shared/utility.service";
import {ApiUrlService} from "../../shared/api-url.service";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {
  @Input()
  public patient: Patient;
  private selectedProvider: Provider;
  public providers: Provider[];
  public paginationConfig: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1
  };

  constructor(private apiUrlService: ApiUrlService,
              private notificationService: NotificationService,
              private providerService: ProviderService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.providerService.getProviders(this.patient.mrn)
      .subscribe(
        (providers) => {
          this.providers = providers;
        },
        err => {
          this.notificationService.show("Failed in getting providers.");
        }
      );
  }

  public onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

  public openConfirmDialog(dialog: any, provider: Provider) {
    dialog.open();
    this.selectedProvider = provider;
  }

  public confirmDeleteProvider(dialog: any) {
    dialog.close();
    if (this.selectedProvider != null) {
      this.providerService.deleteProvider(this.patient.mrn, this.selectedProvider.id)
        .subscribe(
          () => {
            this.providers = this.providers.filter(p => p !== this.selectedProvider);
            this.notificationService.show("Success in deleting provider.");
          },
          err => {
            this.notificationService.show("Failed to delete the provider, please try again later...");
            console.log(err);
          });
    }
  }

  public redirectToPatientProvidersSearch(): void {
    const searchPatientProvidersUrl: string = this.apiUrlService.getPatientProvidersSearchUrl().concat("/" + this.patient.mrn);
    this.utilityService.navigateTo(searchPatientProvidersUrl)
  }
}
