import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentreportsPage } from './studentreports.page';

describe('StudentreportsPage', () => {
  let component: StudentreportsPage;
  let fixture: ComponentFixture<StudentreportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentreportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
