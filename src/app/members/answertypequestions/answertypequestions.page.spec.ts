import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswertypequestionsPage } from './answertypequestions.page';

describe('AnswertypequestionsPage', () => {
  let component: AnswertypequestionsPage;
  let fixture: ComponentFixture<AnswertypequestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswertypequestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswertypequestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
