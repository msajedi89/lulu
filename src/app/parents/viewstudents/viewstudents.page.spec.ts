import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstudentsPage } from './viewstudents.page';

describe('ViewstudentsPage', () => {
  let component: ViewstudentsPage;
  let fixture: ComponentFixture<ViewstudentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstudentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
