import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'c2s-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  getFullYear():number{
    return (new Date()).getFullYear();
  }
}
