import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdrawingquestionPage } from './studentdrawingquestion.page';

describe('StudentdrawingquestionPage', () => {
  let component: StudentdrawingquestionPage;
  let fixture: ComponentFixture<StudentdrawingquestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentdrawingquestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentdrawingquestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
