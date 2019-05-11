import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofstudentexamsPage } from './listofstudentexams.page';

describe('ListofstudentexamsPage', () => {
  let component: ListofstudentexamsPage;
  let fixture: ComponentFixture<ListofstudentexamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofstudentexamsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofstudentexamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
