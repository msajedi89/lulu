import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecternquestionspagePage } from './lecternquestionspage.page';

describe('LecternquestionspagePage', () => {
  let component: LecternquestionspagePage;
  let fixture: ComponentFixture<LecternquestionspagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecternquestionspagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecternquestionspagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
