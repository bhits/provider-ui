import {Component, Input, OnInit} from "@angular/core";
import {ConsentProvider} from "../shared/consent-provider.model";
import {PaginationInstance} from "ng2-pagination";
import {NotificationService} from "../../shared/notification.service";
import {ProviderService} from "../shared/provider.service";
import {User} from "app/user/shared/user.model";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {
  @Input() public patient: User;
  private selectedProvider: ConsentProvider;
  public providers: ConsentProvider[];
  public paginationConfig: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1
  };
  public accordionTab: boolean = true;

  constructor(private notificationService: NotificationService,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    // this.providers = this.providerService.getProviders(this.patient.mrn)
  }

  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

}
