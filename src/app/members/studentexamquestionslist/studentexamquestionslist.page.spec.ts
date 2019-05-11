import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentexamquestionslistPage } from './studentexamquestionslist.page';

describe('StudentexamquestionslistPage', () => {
  let component: StudentexamquestionslistPage;
  let fixture: ComponentFixture<StudentexamquestionslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentexamquestionslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentexamquestionslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
