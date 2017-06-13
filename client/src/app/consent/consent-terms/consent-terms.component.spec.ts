import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentTermsComponent } from './consent-terms.component';

describe('ConsentTermsComponent', () => {
  let component: ConsentTermsComponent;
  let fixture: ComponentFixture<ConsentTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
