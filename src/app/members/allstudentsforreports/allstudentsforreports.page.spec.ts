import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstudentsforreportsPage } from './allstudentsforreports.page';

describe('AllstudentsforreportsPage', () => {
  let component: AllstudentsforreportsPage;
  let fixture: ComponentFixture<AllstudentsforreportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllstudentsforreportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllstudentsforreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
