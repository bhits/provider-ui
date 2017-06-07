import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentSearchComponent } from './consent-search.component';

describe('ConsentSearchComponent', () => {
  let component: ConsentSearchComponent;
  let fixture: ComponentFixture<ConsentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
