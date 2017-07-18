import { Component, OnInit } from '@angular/core';
import {Patient} from "../../patient/shared/patient.model";
import {Observable} from "rxjs/Observable";
import {ActivityHistory} from "../../consent/shared/activity-history.model";
import {ConsentService} from "../../consent/shared/consent.service";
import {ActivatedRoute} from "@angular/router";
import {PageableData} from "../../shared/pageable-data.model";


@Component({
  selector: 'c2s-activity-history',
  templateUrl: './activity-history.component.html',
  styleUrls: ['./activity-history.component.scss']
})
export class ActivityHistoryComponent implements OnInit {

  private selectedPatient: Patient;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public noActivityHistory: boolean = true;
  public loading: boolean = true;
  public asyncConsents: Observable<ActivityHistory[]>;

  constructor(private consentService: ConsentService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedPatient = this.route.snapshot.data['patient'];
    this.getPage(this.currentPage);
  }

  public getPage(page: number) {
    this.loading = true;
    this.asyncConsents = this.consentService.getActivityHistory(this.selectedPatient.mrn, page - 1, this.itemsPerPage)
      .do((activityList: PageableData<ActivityHistory>) => {
        this.noActivityHistory = activityList.totalElements === 0;
        this.totalItems = activityList.totalElements;
        this.currentPage = activityList.number + 1;
        this.loading = false;
      })
      .map(pageableConsent => pageableConsent.content);
  }

}
