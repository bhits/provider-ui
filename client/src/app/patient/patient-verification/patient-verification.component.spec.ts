import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVerificationComponent } from './patient-verification.component';

describe('PatientVerificationComponent', () => {
  let component: PatientVerificationComponent;
  let fixture: ComponentFixture<PatientVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
