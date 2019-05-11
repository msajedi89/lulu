import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsexamlistPage } from './studentsexamlist.page';

describe('StudentsexamlistPage', () => {
  let component: StudentsexamlistPage;
  let fixture: ComponentFixture<StudentsexamlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsexamlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsexamlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
