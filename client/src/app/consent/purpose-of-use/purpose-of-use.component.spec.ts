import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeOfUseComponent } from './purpose-of-use.component';

describe('PurposeOfUseComponent', () => {
  let component: PurposeOfUseComponent;
  let fixture: ComponentFixture<PurposeOfUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurposeOfUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurposeOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
