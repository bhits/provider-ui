import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentDocumentComponent } from './segment-document.component';

describe('SegmentDocumentComponent', () => {
  let component: SegmentDocumentComponent;
  let fixture: ComponentFixture<SegmentDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
