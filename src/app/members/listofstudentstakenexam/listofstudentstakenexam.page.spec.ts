import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofstudentstakenexamPage } from './listofstudentstakenexam.page';

describe('ListofstudentstakenexamPage', () => {
  let component: ListofstudentstakenexamPage;
  let fixture: ComponentFixture<ListofstudentstakenexamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofstudentstakenexamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofstudentstakenexamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
