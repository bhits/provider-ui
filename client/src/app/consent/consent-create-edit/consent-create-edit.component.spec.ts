import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentCreateEditComponent } from './consent-create-edit.component';

describe('ConsentCreateEditComponent', () => {
  let component: ConsentCreateEditComponent;
  let fixture: ComponentFixture<ConsentCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
