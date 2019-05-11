import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenttakenexamquestionlistPage } from './studenttakenexamquestionlist.page';

describe('StudenttakenexamquestionlistPage', () => {
  let component: StudenttakenexamquestionlistPage;
  let fixture: ComponentFixture<StudenttakenexamquestionlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenttakenexamquestionlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenttakenexamquestionlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
