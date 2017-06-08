import {Component, Input, OnInit} from "@angular/core";
import {Patient} from "../../patient/shared/patient.model";
import {ProviderService} from "app/provider/shared/provider.service";
import {UtilityService} from "../../shared/utility.service";
import {Provider} from "app/provider/shared/provider.model";
import {NotificationService} from "app/shared/notification.service";
import {ApiUrlService} from "app/shared/api-url.service";

@Component({
  selector: 'c2s-provider-card-list',
  templateUrl: './provider-card-list.component.html',
  styleUrls: ['./provider-card-list.component.scss']
})
export class ProviderCardListComponent implements OnInit {
  @Input()
  public patient: Patient;
  public providers: Provider[];
  public noProvider: boolean = false;
  public currentPage: number = 1;
  public itemsPerPage: number = 6;

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
          this.noProvider = providers.length === 0;
        },
        err => {
          this.notificationService.show("Failed in getting providers.");
        }
      );
  }

  public onPageChange(number: number) {
    this.currentPage = number;
  }

  public redirectToPatientProvidersSearch(): void {
    const searchPatientProvidersUrl: string = "/patients".concat("/" + this.patient.id).concat(this.apiUrlService.getPatientProvidersSearchUrl());
    this.utilityService.navigateTo(searchPatientProvidersUrl)
  }

  public onDeleteProvider(providerId: number) {
    this.providers = this.providers.filter(provider => provider['id'] !== providerId)
  }
}
