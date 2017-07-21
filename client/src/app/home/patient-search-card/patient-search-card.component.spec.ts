import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSearchCardComponent } from './patient-search-card.component';

describe('PatientSearchCardComponent', () => {
  let component: PatientSearchCardComponent;
  let fixture: ComponentFixture<PatientSearchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSearchCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
