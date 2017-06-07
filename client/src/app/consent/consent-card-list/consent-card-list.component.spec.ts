import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentCardListComponent } from './consent-card-list.component';

describe('ConsentCardListComponent', () => {
  let component: ConsentCardListComponent;
  let fixture: ComponentFixture<ConsentCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
