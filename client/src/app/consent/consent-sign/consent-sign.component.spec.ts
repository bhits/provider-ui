import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentSignComponent } from './consent-sign.component';

describe('ConsentSignComponent', () => {
  let component: ConsentSignComponent;
  let fixture: ComponentFixture<ConsentSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
