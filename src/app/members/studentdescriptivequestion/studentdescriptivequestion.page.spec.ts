import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdescriptivequestionPage } from './studentdescriptivequestion.page';

describe('StudentdescriptivequestionPage', () => {
  let component: StudentdescriptivequestionPage;
  let fixture: ComponentFixture<StudentdescriptivequestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentdescriptivequestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentdescriptivequestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
