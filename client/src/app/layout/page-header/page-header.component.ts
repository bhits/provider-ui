import {Component, OnInit} from "@angular/core";
import {GlobalEventManagementService} from "../../core/global-event-management.service";

@Component({
  selector: 'c2s-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  public showHeader: boolean = false;

  constructor(private globalEventManagementService: GlobalEventManagementService) {
  }

  ngOnInit() {
    this.globalEventManagementService.getShowHeaderEmitter()
      .subscribe(
        (showHeader) => {
          if (showHeader !== null) {
            this.showHeader = showHeader;
          }
        });
  }
}
