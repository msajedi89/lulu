import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecternmaintitlepagePage } from './lecternmaintitlepage.page';

describe('LecternmaintitlepagePage', () => {
  let component: LecternmaintitlepagePage;
  let fixture: ComponentFixture<LecternmaintitlepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecternmaintitlepagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecternmaintitlepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
