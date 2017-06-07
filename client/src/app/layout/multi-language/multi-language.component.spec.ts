import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLanguageComponent } from './multi-language.component';

describe('MultiLanguageComponent', () => {
  let component: MultiLanguageComponent;
  let fixture: ComponentFixture<MultiLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
