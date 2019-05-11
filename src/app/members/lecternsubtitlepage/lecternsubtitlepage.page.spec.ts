import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecternsubtitlepagePage } from './lecternsubtitlepage.page';

describe('LecternsubtitlepagePage', () => {
  let component: LecternsubtitlepagePage;
  let fixture: ComponentFixture<LecternsubtitlepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecternsubtitlepagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecternsubtitlepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
