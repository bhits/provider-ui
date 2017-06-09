import {Component, OnInit} from "@angular/core";
import {Patient} from "../../patient/shared/patient.model";
import {UtilityService} from "../../shared/utility.service";
import {Provider} from "app/provider/shared/provider.model";
import {ApiUrlService} from "app/shared/api-url.service";
import {PaginationInstance} from "ng2-pagination";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'c2s-provider-card-list',
  templateUrl: './provider-card-list.component.html',
  styleUrls: ['./provider-card-list.component.scss']
})
export class ProviderCardListComponent implements OnInit {
  public selectedPatient: Patient;
  public providers: Provider[];
  public noProvider: boolean = false;
  public paginationConfig: PaginationInstance = {
    id: "provider-list",
    itemsPerPage: 6,
    currentPage: 1
  };

  constructor(private apiUrlService: ApiUrlService,
              private route: ActivatedRoute,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    //Todo: Refactor with redux
    this.selectedPatient = this.route.snapshot.data['patient'];
    this.providers = this.route.snapshot.data['providers'];
    this.noProvider = this.providers.length === 0;
  }

  public onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

  public redirectToPatientProvidersSearch(): void {
    const searchPatientProvidersUrl: string = "/patients".concat("/" + this.selectedPatient.id).concat(this.apiUrlService.getPatientProvidersSearchUrl());
    this.utilityService.navigateTo(searchPatientProvidersUrl)
  }

  public onDeleteProvider(providerId: number) {
    this.providers = this.providers.filter(provider => provider['id'] !== providerId)
  }
}
