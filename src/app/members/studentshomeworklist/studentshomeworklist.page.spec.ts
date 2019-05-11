import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentshomeworklistPage } from './studentshomeworklist.page';

describe('StudentshomeworklistPage', () => {
  let component: StudentshomeworklistPage;
  let fixture: ComponentFixture<StudentshomeworklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentshomeworklistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentshomeworklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
