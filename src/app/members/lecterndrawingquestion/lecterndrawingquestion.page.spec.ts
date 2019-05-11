import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecterndrawingquestionPage } from './lecterndrawingquestion.page';

describe('LecterndrawingquestionPage', () => {
  let component: LecterndrawingquestionPage;
  let fixture: ComponentFixture<LecterndrawingquestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecterndrawingquestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecterndrawingquestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
