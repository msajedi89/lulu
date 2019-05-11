import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentrecitequranPage } from './studentrecitequran.page';

describe('StudentrecitequranPage', () => {
  let component: StudentrecitequranPage;
  let fixture: ComponentFixture<StudentrecitequranPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentrecitequranPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentrecitequranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
