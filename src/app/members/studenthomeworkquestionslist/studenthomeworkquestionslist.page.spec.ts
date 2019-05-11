import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenthomeworkquestionslistPage } from './studenthomeworkquestionslist.page';

describe('StudenthomeworkquestionslistPage', () => {
  let component: StudenthomeworkquestionslistPage;
  let fixture: ComponentFixture<StudenthomeworkquestionslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenthomeworkquestionslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenthomeworkquestionslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
