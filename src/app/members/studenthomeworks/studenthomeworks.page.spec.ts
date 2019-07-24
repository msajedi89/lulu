import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenthomeworksPage } from './studenthomeworks.page';

describe('StudenthomeworksPage', () => {
  let component: StudenthomeworksPage;
  let fixture: ComponentFixture<StudenthomeworksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenthomeworksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenthomeworksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
