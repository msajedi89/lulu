import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecterndragdropquestionPage } from './lecterndragdropquestion.page';

describe('LecterndragdropquestionPage', () => {
  let component: LecterndragdropquestionPage;
  let fixture: ComponentFixture<LecterndragdropquestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecterndragdropquestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecterndragdropquestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
