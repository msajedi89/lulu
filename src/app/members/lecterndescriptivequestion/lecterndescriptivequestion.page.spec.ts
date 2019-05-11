import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecterndescriptivequestionPage } from './lecterndescriptivequestion.page';

describe('LecterndescriptivequestionPage', () => {
  let component: LecterndescriptivequestionPage;
  let fixture: ComponentFixture<LecterndescriptivequestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecterndescriptivequestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecterndescriptivequestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
