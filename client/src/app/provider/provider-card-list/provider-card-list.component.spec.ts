import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCardListComponent } from './provider-card-list.component';

describe('ProviderCardListComponent', () => {
  let component: ProviderCardListComponent;
  let fixture: ComponentFixture<ProviderCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
