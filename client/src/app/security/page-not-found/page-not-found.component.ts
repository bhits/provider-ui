import {Component, OnInit} from "@angular/core";
import {CustomTranslateService} from "../../core/custom-translate.service";
@Component({
  selector: 'c2s-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private customTranslateService: CustomTranslateService,) {
    customTranslateService.setDefaultLanguage('en');
  }

  ngOnInit() {
  }

}
