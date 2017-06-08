import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentCardComponent } from './consent-card.component';

describe('ConsentCardComponent', () => {
  let component: ConsentCardComponent;
  let fixture: ComponentFixture<ConsentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
