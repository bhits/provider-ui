import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSearchResultComponent } from './provider-search-result.component';

describe('ProviderSearchResultComponent', () => {
  let component: ProviderSearchResultComponent;
  let fixture: ComponentFixture<ProviderSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
