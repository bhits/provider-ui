import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import {SocialSecurityPipe} from "./social-security.pipe";

@Directive({
  selector: '[c2sSocialSecurityMask]'
})
export class SocialSecurityMaskDirective  implements OnInit{
  private htmlInputElement: HTMLInputElement;

  constructor( private elementRef: ElementRef, private socialSecurityPipe: SocialSecurityPipe) {
    this.htmlInputElement = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.htmlInputElement.value = this.socialSecurityPipe.transform(this.htmlInputElement.value, true);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.htmlInputElement.value = this.socialSecurityPipe.parse(value);
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.htmlInputElement.value = this.socialSecurityPipe.transform(value, true);
  }
}
