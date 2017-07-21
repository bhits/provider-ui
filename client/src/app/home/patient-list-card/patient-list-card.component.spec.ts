import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListCardComponent } from './patient-list-card.component';

describe('PatientListCardComponent', () => {
  let component: PatientListCardComponent;
  let fixture: ComponentFixture<PatientListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
