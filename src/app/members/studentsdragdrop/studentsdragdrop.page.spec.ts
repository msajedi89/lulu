import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsdragdropPage } from './studentsdragdrop.page';

describe('StudentsdragdropPage', () => {
  let component: StudentsdragdropPage;
  let fixture: ComponentFixture<StudentsdragdropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsdragdropPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsdragdropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
