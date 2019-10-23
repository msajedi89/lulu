import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenttakelecternexamPage } from './studenttakelecternexam.page';

describe('StudenttakelecternexamPage', () => {
  let component: StudenttakelecternexamPage;
  let fixture: ComponentFixture<StudenttakelecternexamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenttakelecternexamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenttakelecternexamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
