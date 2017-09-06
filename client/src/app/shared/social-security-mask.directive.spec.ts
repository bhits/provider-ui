import { SocialSecurityMaskDirective } from './social-security-mask.directive';
import {ElementRef} from "@angular/core/src/linker/element_ref";
import {SocialSecurityPipe} from "./social-security.pipe";

describe('SocialSecurityMaskDirective', () => {
  it('should create an instance', () => {
    let elementRef: ElementRef;
    let socialSecurityPipe: SocialSecurityPipe;
    const directive = new SocialSecurityMaskDirective(elementRef,socialSecurityPipe );
    expect(directive).toBeTruthy();
  });
});
