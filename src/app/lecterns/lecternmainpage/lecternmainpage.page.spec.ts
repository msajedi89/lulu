import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecternmainpagePage } from './lecternmainpage.page';

describe('LecternmainpagePage', () => {
  let component: LecternmainpagePage;
  let fixture: ComponentFixture<LecternmainpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecternmainpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecternmainpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
