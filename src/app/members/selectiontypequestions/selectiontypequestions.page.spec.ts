import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiontypequestionsPage } from './selectiontypequestions.page';

describe('SelectiontypequestionsPage', () => {
  let component: SelectiontypequestionsPage;
  let fixture: ComponentFixture<SelectiontypequestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiontypequestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiontypequestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
