import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentselectivequestionsPage } from './studentselectivequestions.page';

describe('StudentselectivequestionsPage', () => {
  let component: StudentselectivequestionsPage;
  let fixture: ComponentFixture<StudentselectivequestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentselectivequestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentselectivequestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
