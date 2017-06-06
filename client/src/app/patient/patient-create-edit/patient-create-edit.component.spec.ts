import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCreateEditComponent } from './patient-create-edit.component';

describe('PatientCreateEditComponent', () => {
  let component: PatientCreateEditComponent;
  let fixture: ComponentFixture<PatientCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
