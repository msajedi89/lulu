import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatreportmaintitlequestionslistPage } from './catreportmaintitlequestionslist.page';

describe('CatreportmaintitlequestionslistPage', () => {
  let component: CatreportmaintitlequestionslistPage;
  let fixture: ComponentFixture<CatreportmaintitlequestionslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatreportmaintitlequestionslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatreportmaintitlequestionslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
