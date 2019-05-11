import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsdragtotablequestionPage } from './studentsdragtotablequestion.page';

describe('StudentsdragtotablequestionPage', () => {
  let component: StudentsdragtotablequestionPage;
  let fixture: ComponentFixture<StudentsdragtotablequestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsdragtotablequestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsdragtotablequestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
