import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMultiAddComponent } from './provider-multi-add.component';

describe('ProviderMultiAddComponent', () => {
  let component: ProviderMultiAddComponent;
  let fixture: ComponentFixture<ProviderMultiAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderMultiAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMultiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
