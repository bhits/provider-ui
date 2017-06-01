import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlValidationErrorMessageComponent } from './control-validation-error-message.component';

describe('ControlValidationErrorMessageComponent', () => {
  let component: ControlValidationErrorMessageComponent;
  let fixture: ComponentFixture<ControlValidationErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlValidationErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlValidationErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
