import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsexamPage } from './studentsexam.page';

describe('StudentsexamPage', () => {
  let component: StudentsexamPage;
  let fixture: ComponentFixture<StudentsexamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsexamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsexamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
