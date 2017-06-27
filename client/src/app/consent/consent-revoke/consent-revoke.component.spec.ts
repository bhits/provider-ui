import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentRevokeComponent } from './consent-revoke.component';

describe('ConsentRevokeComponent', () => {
  let component: ConsentRevokeComponent;
  let fixture: ComponentFixture<ConsentRevokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentRevokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
