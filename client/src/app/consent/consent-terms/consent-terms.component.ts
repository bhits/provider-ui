import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'c2s-consent-terms',
  templateUrl: './consent-terms.component.html',
  styleUrls: ['./consent-terms.component.scss']
})
export class ConsentTermsComponent implements OnInit {
  public startDate: Date;
  public endDate: Date;
  public isOpenOnFocus: boolean = true;
  public FORMAT: string = "MM/dd/y";

  constructor() {
  }

  ngOnInit() {
  }

}
